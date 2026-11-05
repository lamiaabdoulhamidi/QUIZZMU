# QuizzMU

Blind test musical en français, avec des extraits récupérés en direct depuis l’API publique Deezer.

## Blind test Rap

- Genre Deezer Rap/Hip-Hop (`116`), catalogue et extraits chargés automatiquement.
- Chaque morceau doit avoir un titre, un artiste, un rang Deezer valide et une preview.
- Les trois niveaux sont calculés en triant les rangs réels reçus : les rangs les plus élevés en Facile, ceux du milieu en Moyen et les plus faibles en Difficile. Aucun score n’est inventé.
- Chaque partie propose 10 morceaux tirés au hasard. Pour chaque question, quatre titres issus du catalogue Deezer sont proposés.
- Le titre, l’artiste et le rang du morceau joué sont révélés seulement après le choix du joueur.

## Lancer le projet

Ouvre `index.html` dans un navigateur, ou démarre un serveur local :

```bash
python -m http.server 8000
```

Puis visite `http://localhost:8000`.

Le site utilise JSONP pour interroger Deezer depuis GitHub Pages sans serveur intermédiaire. Une connexion Internet est nécessaire.

## Fichiers principaux

- `index.html` : interface du blind test.
- `script.js` : récupération Deezer, répartition des difficultés et logique de partie.
- `styles.css`, `artist-quiz.css`, `dark-theme.css` : styles de l’interface.
