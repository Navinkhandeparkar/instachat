const functions = require("firebase-functions");
const Filter = require("bad-words");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.filterMessages = functions.firestore
  .document("messages/{msgId}")
  .onCreate(async (doc, ctx) => {
    const filter = new Filter();
    const { text, uid } = doc.data();

    if (filter.isProfane(text)) {
      const cleaned = filter.clean(text);

      const userRef = db.collection("users").doc(uid);
      const userData = (await userRef.get()).data();
      if (userData.badwordsCount && userData.badwordsCount >= 3) {
        await doc.ref.update({
          text: `🤐 I got banned for life for saying: ${cleaned}`,
        });
        await db.collection("banned").doc(uid).set({});
      } else {
        await userRef.update({
          badwordsCount: (userData.badwordsCount || 0) + 1,
        });
        await doc.ref.update({
          text: `${cleaned} - (warning ${(userData.badwordsCount || 0) + 1})`,
        });
      }
    }
  });
