import schedule from "node-schedule";
import Match from "../users/users.model.js";
import Favorite from "../users/users.model.js";
import sendEmail from "./email.service.js";

// Planification de la tâche
const scheduleMatchNotifications = () => {
  // Exécuter la tâche toutes les minutes
  schedule.scheduleJob("* * * * *", async () => {
    console.log("Recherche de matchs à venir");

    const now = new Date();
    const upcomingTime = new Date(now.getTime() + 30 * 60 * 1000); // Maintenant + 30 minutes

    try {
      // Récupérer les matchs qui commencent dans 30 minutes
      const matches = await Match.find({
        startTime: { $gte: now, $lte: upcomingTime },
      });

      for (const match of matches) {
        // Récupérer les utilisateurs ayant ajouté ce match en favori
        const favorites = await Favorite.find({ matchId: match._id }).populate(
          "userId"
        );

        for (const favorite of favorites) {
          const userEmail = favorite.userId.email;

          // Envoyer un e-mail
          const subject = `Rappel: ${match.title} commence bientot !`;
          const text = `Bonjour, votre match "${
            match.title
          }" commence dans 30 min ! ${new Date(
            match.startTime
          ).toLocaleString()}.\n\nNe le manquez pas !`;

          await sendEmail(userEmail, subject, text);
        }
      }
    } catch (error) {
      console.error(`Error scheduling notifications: ${error.message}`);
    }
  });
};

export default scheduleMatchNotifications;
