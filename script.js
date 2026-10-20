const quizQuestions = [
  { id: "rap-001", genre: "rap", difficulty: "facile", artist: "Kendrick Lamar", title: "Not Like Us", prompt: "Qui chante la chanson 'Not Like Us' ?", acceptedAnswers: ["Kendrick Lamar", "kendrick lamar"], hints: ["C'est un rappeur californien issu de la scène West Coast.", "Il est connu pour 'HUMBLE.' et 'DNA.'.", "Il a aussi été au centre d'un clash avec Drake."], explanation: "Kendrick Lamar a sorti 'Not Like Us' en 2024, devenu un énorme succès rap mondial.", source: "Singles et classements musicaux 2024" },
  { id: "rap-002", genre: "rap", difficulty: "facile", artist: "Kendrick Lamar", title: "HUMBLE.", prompt: "Qui est l'artiste de 'HUMBLE.' ?", acceptedAnswers: ["Kendrick Lamar", "kendrick lamar"], hints: ["Il a remporté plusieurs Grammys.", "Le titre est sorti sur l'album 'DAMN.'.", "Il commence par la phrase 'Sit down, be humble'."], explanation: "'HUMBLE.' est l'un des titres les plus emblématiques de Kendrick Lamar.", source: "Album DAMN. / hits 2017" },
  { id: "rap-003", genre: "rap", difficulty: "facile", artist: "Eminem", title: "Houdini", prompt: "Qui a sorti le single 'Houdini' ?", acceptedAnswers: ["Eminem", "eminem"], hints: ["C'est un rappeur historique de la scène américaine.", "Il est connu pour 'Lose Yourself'.", "Le morceau a marqué son retour en 2024."], explanation: "Eminem est l'artiste principal de 'Houdini', un single très attendu en 2024.", source: "Singles 2024" },
  { id: "rap-004", genre: "rap", difficulty: "facile", artist: "Drake", title: "God's Plan", prompt: "Qui chante 'God's Plan' ?", acceptedAnswers: ["Drake", "drake"], hints: ["C'est un rappeur canadien très populaire.", "Le morceau a connu un succès mondial énorme.", "Il a aussi sorti 'One Dance'."], explanation: "'God's Plan' est un des grands succès de Drake, sorti en 2018.", source: "Singles 2018" },
  { id: "rap-005", genre: "rap", difficulty: "facile", artist: "Travis Scott", title: "SICKO MODE", prompt: "Qui est l'artiste du titre 'SICKO MODE' ?", acceptedAnswers: ["Travis Scott", "travis scott"], hints: ["Il vient d'Houston.", "Le morceau est issu de l'album 'Astroworld'.", "Il collabore souvent avec Young Thug et Kid Cudi."], explanation: "'SICKO MODE' est un morceau de Travis Scott, extrait de l'album 'Astroworld'.", source: "Album Astroworld" },
  { id: "rap-006", genre: "rap", difficulty: "facile", artist: "Gunna", title: "Fukumean", prompt: "Qui est l'artiste du titre 'Fukumean' ?", acceptedAnswers: ["Gunna", "gunna"], hints: ["C'est un rappeur originaire d'Atlanta.", "Il a travaillé avec Young Thug.", "Le morceau est très présent dans les playlists rap."], explanation: "'Fukumean' est un titre de Gunna, très diffusé dans les charts rap.", source: "Singles 2023" },
  { id: "rap-007", genre: "rap", difficulty: "facile", artist: "Future", title: "Wait For U", prompt: "Qui chante 'Wait For U' avec Drake et Tems ?", acceptedAnswers: ["Future", "future"], hints: ["C'est un rappeur originel de l'Atlanta trap.", "Le titre est sorti sur l'album 'I NEVER LIKED YOU'.", "Il est connu pour ses collaborations fréquentes."], explanation: "Le morceau est porté par Future, avec Drake et Tems en featuring.", source: "Album I NEVER LIKED YOU (2022)" },
  { id: "rap-008", genre: "rap", difficulty: "facile", artist: "The Weeknd", title: "One Right Now", prompt: "Qui interprète 'One Right Now' avec Post Malone ?", acceptedAnswers: ["The Weeknd", "the weeknd"], hints: ["C'est un artiste canadien très connu.", "Il est aussi lié à 'Blinding Lights'.", "Il a collaboré avec Post Malone."], explanation: "'One Right Now' est une collaboration entre The Weeknd et Post Malone.", source: "Singles 2021" },
  { id: "rap-009", genre: "rap", difficulty: "moyen", artist: "Baby Keem", title: "The Hillbillies", prompt: "Quel rappeur est derrière le titre 'The Hillbillies' ?", acceptedAnswers: ["Baby Keem", "baby keem"], hints: ["Il est le cousin de Kendrick Lamar.", "Il est connu pour des sonorités expérimentales.", "Il a sorti 'Family Ties' avec Kendrick."], explanation: "Baby Keem est l'artiste principal de 'The Hillbillies'.", source: "Singles récents / streaming" },
  { id: "rap-010", genre: "rap", difficulty: "moyen", artist: "J. Cole", title: "First Time", prompt: "Quel artiste a sorti 'First Time' ?", acceptedAnswers: ["J. Cole", "j cole"], hints: ["C'est un rappeur phare de la génération actuelle.", "Il est connu pour 'No Role Modelz'.", "Il est originaire de Fayetteville."], explanation: "J. Cole est l'artiste de ce morceau qui a marqué les playlists rap.", source: "Singles / projets récents" },
  { id: "rap-011", genre: "rap", difficulty: "moyen", artist: "Lil Baby", title: "Freestyle", prompt: "Quel artiste est connu pour le morceau 'Freestyle' ?", acceptedAnswers: ["Lil Baby", "lil baby"], hints: ["Il est originaire d'Atlanta.", "Il connaît un énorme succès dans le rap américain.", "Il a sorti des titres comme 'Drip Too Hard'."], explanation: "Lil Baby a popularisé 'Freestyle' dans le rap moderne.", source: "Singles 2022" },
  { id: "rap-012", genre: "rap", difficulty: "moyen", artist: "Doja Cat", title: "Attention", prompt: "Qui interprète 'Attention' ?", acceptedAnswers: ["Doja Cat", "doja cat"], hints: ["C'est aussi une chanteuse et rappeuse.", "Elle a sorti des morceaux très streamés.", "Son univers est à la fois pop et rap."], explanation: "Doja Cat interprète 'Attention', un titre très visible sur les plateformes.", source: "Singles 2023" },
  { id: "rap-013", genre: "rap", difficulty: "moyen", artist: "Metro Boomin", title: "Superhero", prompt: "Qui est l'artiste de 'Superhero' avec Future et Chris Brown ?", acceptedAnswers: ["Metro Boomin", "metro boomin"], hints: ["C'est un producteur très influent.", "Il est souvent associé à des morceaux de trap moderne.", "Il a travaillé avec Future et Young Thug."], explanation: "Metro Boomin est l'artiste principal de la production et de la présence de ce morceau.", source: "Singles / production 2023" },
  { id: "rap-014", genre: "rap", difficulty: "moyen", artist: "21 Savage", title: "Redrum", prompt: "Quel artiste est derrière 'Redrum' ?", acceptedAnswers: ["21 Savage", "21 savage"], hints: ["C'est un rappeur de la scène américaine.", "Il est connu pour son style très direct.", "Son style est souvent associé au trap."], explanation: "21 Savage a sorti 'Redrum' dans le paysage rap contemporain.", source: "Singles 2024" },
  { id: "rap-015", genre: "rap", difficulty: "moyen", artist: "Playboi Carti", title: "Good Credit", prompt: "Qui interprète 'Good Credit' ?", acceptedAnswers: ["Playboi Carti", "playboi carti"], hints: ["Il est connu pour son univers trap avant-gardiste.", "Il est souvent très présent dans les playlists rap.", "Il est associé à l'album 'Music'."], explanation: "Playboi Carti est l'auteur de 'Good Credit'.", source: "Singles / rap actuel" },
  { id: "rap-016", genre: "rap", difficulty: "moyen", artist: "Young Thug", title: "Lifestyle", prompt: "Quel artiste est associé au titre 'Lifestyle' ?", acceptedAnswers: ["Young Thug", "young thug"], hints: ["C'est un rappeur qui a beaucoup marqué la scène trap.", "Le titre est très connu dans les playlists rap.", "Il a souvent collaboré avec Gunna et Travis Scott."], explanation: "'Lifestyle' est un single très connu de Young Thug.", source: "Singles 2018" },
  { id: "rap-017", genre: "rap", difficulty: "difficile", artist: "Kanye West", title: "Carnival", prompt: "Quel artiste est derrière 'Carnival' avec Playboi Carti et Ty Dolla $ign ?", acceptedAnswers: ["Kanye West", "kanye west"], hints: ["C'est un rappeur et producteur de renommée mondiale.", "Le morceau est issu d'un album récent.", "Il a collaboré avec Ty Dolla $ign et Playboi Carti."], explanation: "'Carnival' est un morceau de Kanye West avec Playboi Carti et Ty Dolla $ign.", source: "Album Vultures / 2024" },
  { id: "rap-018", genre: "rap", difficulty: "difficile", artist: "A$AP Rocky", title: "Praise The Lord", prompt: "Qui chante 'Praise The Lord' avec Skepta ?", acceptedAnswers: ["A$AP Rocky", "asap rocky", "a$ap rocky"], hints: ["C'est un rappeur new-yorkais.", "Le morceau est associé au style trap et alternatif.", "Il a sorti de nombreux hits au cours des dernières années."], explanation: "A$AP Rocky interprète 'Praise The Lord', en featuring avec Skepta.", source: "Singles 2018" },
  { id: "rap-019", genre: "rap", difficulty: "difficile", artist: "Migos", title: "MotorSport", prompt: "Quel groupe est à l'origine de 'MotorSport' ?", acceptedAnswers: ["Migos", "migos"], hints: ["Le groupe est formé de trois rappeurs.", "Le titre a fait grand bruit en 2018.", "Il comporte des collaborations avec Nicki Minaj et Cardi B."], explanation: "'MotorSport' est un titre emblématique de Migos.", source: "Singles 2018" },
  { id: "rap-020", genre: "rap", difficulty: "difficile", artist: "Cardi B", title: "WAP", prompt: "Qui interprète 'WAP' avec Megan Thee Stallion ?", acceptedAnswers: ["Cardi B", "cardi b"], hints: ["C'est une rappeuse très connue.", "Le titre est devenu viral en 2020.", "Elle a collaboré avec Megan Thee Stallion."], explanation: "'WAP' est une collaboration entre Cardi B et Megan Thee Stallion.", source: "Singles 2020" },
  { id: "rap-021", genre: "rap", difficulty: "difficile", artist: "Lil Uzi Vert", title: "Just Wanna Rock", prompt: "Qui a sorti 'Just Wanna Rock' ?", acceptedAnswers: ["Lil Uzi Vert", "lil uzi vert"], hints: ["C'est un rappeur très présent sur les plateformes.", "Son univers est mixte rap et trap.", "Le morceau a connu un gros succès viral."], explanation: "Lil Uzi Vert est l'artiste de 'Just Wanna Rock'.", source: "Singles 2023" },
  { id: "rap-022", genre: "rap", difficulty: "difficile", artist: "NLE Choppa", title: "Slut Me Out", prompt: "Qui chante 'Slut Me Out' ?", acceptedAnswers: ["NLE Choppa", "nle choppa"], hints: ["Il est connu pour son style trap très reconnaissable.", "Le morceau est sorti au milieu des années 2020.", "Il est américain."], explanation: "NLE Choppa est derrière le single 'Slut Me Out'.", source: "Singles 2023" },
  { id: "pop-001", genre: "pop", difficulty: "facile", artist: "Sabrina Carpenter", title: "Espresso", prompt: "Qui chante 'Espresso' ?", acceptedAnswers: ["Sabrina Carpenter", "sabrina carpenter"], hints: ["C'est une chanteuse pop très présente dans les charts.", "Elle a sorti plusieurs tubes récents.", "Le titre est très accrocheur."], explanation: "Sabrina Carpenter est l'interprète de 'Espresso'.", source: "Charts pop 2024" },
  { id: "pop-002", genre: "pop", difficulty: "facile", artist: "Benson Boone", title: "Beautiful Things", prompt: "Quel artiste a sorti 'Beautiful Things' ?", acceptedAnswers: ["Benson Boone", "benson boone"], hints: ["Il est chanteur et connu pour sa voix puissante.", "Le titre a beaucoup circulé en radio.", "Il est très en vogue dans le pop contemporain."], explanation: "Benson Boone est l'artiste de 'Beautiful Things'.", source: "Singles 2024" },
  { id: "pop-003", genre: "pop", difficulty: "facile", artist: "Rosé", title: "Apt.", prompt: "Qui chante 'Apt.' ?", acceptedAnswers: ["Rosé", "rose", "rosé"], hints: ["C'est une chanteuse du groupe BLACKPINK.", "Le morceau est une collaboration avec Bruno Mars.", "Le titre a explosé sur les plateformes."], explanation: "'Apt.' est interprété par Rosé, en collaboration avec Bruno Mars.", source: "Singles 2024" },
  { id: "pop-004", genre: "pop", difficulty: "facile", artist: "Billie Eilish", title: "Birds of a Feather", prompt: "Quel artiste est derrière le titre 'Birds of a Feather' ?", acceptedAnswers: ["Billie Eilish", "billie eilish"], hints: ["C'est une artiste pop très influente.", "Elle a sorti 'Ocean Eyes' et 'Bad Guy'.", "Son univers est doux et mélancolique."], explanation: "Billie Eilish est l'interprète de 'Birds of a Feather'.", source: "Singles récents" },
  { id: "pop-005", genre: "pop", difficulty: "facile", artist: "Hozier", title: "Too Sweet", prompt: "Qui a sorti 'Too Sweet' ?", acceptedAnswers: ["Hozier", "hozier"], hints: ["C'est un chanteur connu pour une voix très particulière.", "Le titre a connu un vrai engouement en 2024.", "Il est issu du univers folk rock."], explanation: "Hozier est l'artiste de 'Too Sweet'.", source: "Singles 2024" },
  { id: "pop-006", genre: "pop", difficulty: "facile", artist: "Sabrina Carpenter", title: "Please Please Please", prompt: "Quel artiste chante 'Please Please Please' ?", acceptedAnswers: ["Sabrina Carpenter", "sabrina carpenter"], hints: ["Elle a eu un vrai boom avec plusieurs tubes pop.", "Le morceau est très connu sur les radios.", "Elle a aussi sorti 'Espresso'."], explanation: "Sabrina Carpenter est la chanteuse de 'Please Please Please'.", source: "Singles 2024" },
  { id: "pop-007", genre: "pop", difficulty: "facile", artist: "Taylor Swift", title: "Fortnight", prompt: "Qui interprète 'Fortnight' ?", acceptedAnswers: ["Taylor Swift", "taylor swift"], hints: ["C'est une artiste mondiale très présente dans les classements.", "Le titre a été lancé avec Post Malone.", "Elle sort régulièrement des albums majeurs."], explanation: "'Fortnight' est un titre de Taylor Swift, en featuring avec Post Malone.", source: "Album The Tortured Poets Department" },
  { id: "pop-008", genre: "pop", difficulty: "facile", artist: "Olivia Rodrigo", title: "obsessed", prompt: "Qui chante 'obsessed' ?", acceptedAnswers: ["Olivia Rodrigo", "olivia rodrigo"], hints: ["C'est une chanteuse pop très écoutée.", "Son univers est très actuel et très visuel.", "Elle a sorti beaucoup de hits au cours des dernières années."], explanation: "Olivia Rodrigo est l'interprète de 'obsessed'.", source: "Singles récents" },
  { id: "pop-009", genre: "pop", difficulty: "moyen", artist: "Lady Gaga", title: "Abracadabra", prompt: "Qui est l'artiste de 'Abracadabra' ?", acceptedAnswers: ["Lady Gaga", "lady gaga"], hints: ["C'est une artiste pop emblématique.", "Le titre a une forte dimension dance pop.", "Elle a une carrière très longue."], explanation: "Lady Gaga a sorti 'Abracadabra' dans le paysage pop moderne.", source: "Singles 2025" },
  { id: "pop-010", genre: "pop", difficulty: "moyen", artist: "Miley Cyrus", title: "Flowers", prompt: "Quelle chanteuse a sorti 'Flowers' ?", acceptedAnswers: ["Miley Cyrus", "miley cyrus"], hints: ["Elle a connu un grand succès avec un titre très écouté.", "Le morceau est souvent associé à un univers solaire.", "Elle a aussi sorti 'Party in the U.S.A.'."], explanation: "Miley Cyrus est l'interprète de 'Flowers'.", source: "Singles 2023" },
  { id: "pop-011", genre: "pop", difficulty: "moyen", artist: "The Weeknd", title: "Blinding Lights", prompt: "Qui interprète 'Blinding Lights' ?", acceptedAnswers: ["The Weeknd", "the weeknd"], hints: ["C'est un artiste canadien très connu.", "Le morceau est un énorme succès mondial.", "Le titre a des sonorités synthwave."], explanation: "The Weeknd a interprété 'Blinding Lights', l'un des meilleurs tubes de la décennie.", source: "Singles 2020" },
  { id: "pop-012", genre: "pop", difficulty: "moyen", artist: "Ariana Grande", title: "yes, and?", prompt: "Qui chante 'yes, and ?' ?", acceptedAnswers: ["Ariana Grande", "ariana grande"], hints: ["C'est une chanteuse aux nombreuses récompenses.", "Le titre est très visible en pop moderne.", "Elle est très présente sur les plateformes."], explanation: "Ariana Grande est la chanteuse de 'yes, and?'.", source: "Singles 2024" },
  { id: "pop-013", genre: "pop", difficulty: "moyen", artist: "Daft Punk", title: "Get Lucky", prompt: "Qui est derrière 'Get Lucky' ?", acceptedAnswers: ["Daft Punk", "daft punk"], hints: ["Le groupe est très lié au dance électronique.", "Le morceau met en vedette Pharrell Williams.", "Le titre est sorti sur un album de 2013."], explanation: "'Get Lucky' est un morceau historique de Daft Punk.", source: "Album Random Access Memories (2013)" },
  { id: "pop-014", genre: "pop", difficulty: "moyen", artist: "Adele", title: "Easy On Me", prompt: "Qui interprète 'Easy On Me' ?", acceptedAnswers: ["Adele", "adele"], hints: ["C'est une chanteuse britannique majeure.", "Le morceau est sorti en 2021.", "Elle est connue pour ses ballades puissantes."], explanation: "Adele est l'interprète de 'Easy On Me'.", source: "Singles 2021" },
  { id: "pop-015", genre: "pop", difficulty: "moyen", artist: "Rihanna", title: "Umbrella", prompt: "Qui chante 'Umbrella' ?", acceptedAnswers: ["Rihanna", "rihanna"], hints: ["C'est une artiste très emblématique de la pop mondiale.", "Le tube est sorti dans les années 2000.", "Elle est aussi connue pour 'Diamonds'."], explanation: "Rihanna est l'interprète de 'Umbrella'.", source: "Singles 2007" },
  { id: "pop-016", genre: "pop", difficulty: "moyen", artist: "Måneskin", title: "Beggin'", prompt: "Quel groupe interprète 'Beggin'' ?", acceptedAnswers: ["Måneskin", "maneskin"], hints: ["Le groupe est italien.", "Le titre a connu un succès mondial.", "Il est connu pour un style rock pop."], explanation: "Måneskin est le groupe qui a popularisé 'Beggin''.", source: "Singles 2021" },
  { id: "pop-017", genre: "pop", difficulty: "difficile", artist: "Katy Perry", title: "Dark Horse", prompt: "Qui chante 'Dark Horse' ?", acceptedAnswers: ["Katy Perry", "katy perry"], hints: ["C'est une chanteuse pop très importante.", "Le morceau est très lié aux sonorités trap.", "Le titre est sorti en 2013."], explanation: "'Dark Horse' est un tube de Katy Perry.", source: "Singles 2013" },
  { id: "pop-018", genre: "pop", difficulty: "difficile", artist: "Madonna", title: "Like It or Not", prompt: "Quel artiste a sorti 'Like It or Not' ?", acceptedAnswers: ["Madonna", "madonna"], hints: ["C'est une icône de la musique pop.", "Le titre est associé à une époque électronique.", "Elle a connu plusieurs décennies de succès."], explanation: "Madonna est l'artiste de 'Like It or Not'.", source: "Catalogue 2005" },
  { id: "pop-019", genre: "pop", difficulty: "difficile", artist: "Justin Bieber", title: "Peaches", prompt: "Qui interprète 'Peaches' ?", acceptedAnswers: ["Justin Bieber", "justin bieber"], hints: ["C'est un chanteur canadien de renom.", "Le morceau a une vibe pop-funk.", "Le titre a été très écouté en 2021."], explanation: "Justin Bieber est l'interprète principal de 'Peaches'.", source: "Singles 2021" },
  { id: "pop-020", genre: "pop", difficulty: "difficile", artist: "Ed Sheeran", title: "Shape of You", prompt: "Quel artiste a sorti 'Shape of You' ?", acceptedAnswers: ["Ed Sheeran", "ed sheeran"], hints: ["C'est un auteur-compositeur très connu.", "Le titre est un énorme tube mondial.", "Il a une forte présence sur la scène pop."], explanation: "Ed Sheeran est l'auteur de 'Shape of You'.", source: "Singles 2017" },
  { id: "pop-021", genre: "pop", difficulty: "difficile", artist: "Beyoncé", title: "Texas Hold 'Em", prompt: "Qui chante 'Texas Hold 'Em' ?", acceptedAnswers: ["Beyoncé", "beyonce"], hints: ["C'est une artiste très influente au niveau mondial.", "Le titre a une couleur plus country-pop.", "Elle a sorti plusieurs morceaux majeurs."], explanation: "Beyoncé est l'artiste de 'Texas Hold 'Em'.", source: "Singles 2024" },
  { id: "pop-022", genre: "pop", difficulty: "difficile", artist: "Sam Smith", title: "Unholy", prompt: "Qui chante 'Unholy' ?", acceptedAnswers: ["Sam Smith", "sam smith"], hints: ["C'est un chanteur britannique.", "Le morceau est une collaboration avec Kim Petras.", "Le titre est un énorme succès en 2022."], explanation: "Sam Smith a interprété 'Unholy' avec Kim Petras.", source: "Singles 2022" },
  { id: "pop-023", genre: "pop", difficulty: "difficile", artist: "Doja Cat", title: "Paint the Town Red", prompt: "Qui interprète 'Paint the Town Red' ?", acceptedAnswers: ["Doja Cat", "doja cat"], hints: ["C'est une artiste aux univers pop et rap.", "Le morceau a été très streamé en 2023.", "Elle est aussi connue pour 'Woman'."], explanation: "Doja Cat est l'interprète de 'Paint the Town Red'.", source: "Singles 2023" },
  { id: "rnb-001", genre: "rnb", difficulty: "facile", artist: "SZA", title: "Snooze", prompt: "Qui chante 'Snooze' ?", acceptedAnswers: ["SZA", "sza"], hints: ["C'est une star du R&B moderne.", "Le titre est sorti en 2023.", "Elle est connue pour 'Good Days'."], explanation: "SZA est l'artiste de 'Snooze'.", source: "Singles 2023" },
  { id: "rnb-002", genre: "rnb", difficulty: "facile", artist: "Beyoncé", title: "Cuff It", prompt: "Qui est l'artiste de 'Cuff It' ?", acceptedAnswers: ["Beyoncé", "beyonce"], hints: ["C'est une artiste majeure du R&B et de la pop.", "Le morceau est sorti sur un album très attendu.", "Le titre est dansant et très groove."], explanation: "Beyoncé interprète 'Cuff It'.", source: "Album Renaissance" },
  { id: "rnb-003", genre: "rnb", difficulty: "facile", artist: "Victoria Monét", title: "On My Mama", prompt: "Qui a sorti le morceau 'On My Mama' ?", acceptedAnswers: ["Victoria Monét", "victoria monet"], hints: ["C'est une chanteuse R&B et auteure-compositrice.", "Le titre est plus fun et groove.", "Elle a travaillé avec plusieurs grands artistes."], explanation: "Victoria Monét est l'artiste principale de 'On My Mama'.", source: "Singles récents" },
  { id: "rnb-004", genre: "rnb", difficulty: "facile", artist: "SZA", title: "Kill Bill", prompt: "Qui chante 'Kill Bill' ?", acceptedAnswers: ["SZA", "sza"], hints: ["C'est un titre très populaire en R&B.", "Le morceau est très présent dans les playlists.", "L'artiste est aussi connue pour 'Snooze'."], explanation: "SZA est l'interprète de 'Kill Bill'.", source: "Singles 2022" },
  { id: "rnb-005", genre: "rnb", difficulty: "facile", artist: "Troye Sivan", title: "Rush", prompt: "Quel artiste est derrière 'Rush' ?", acceptedAnswers: ["Troye Sivan", "troye sivan"], hints: ["Il est australien.", "Le titre a connu un fort succès dans le pop/R&B.", "Il est aussi connu pour 'One of Your Girls'."], explanation: "Troye Sivan est l'artiste de 'Rush'.", source: "Singles 2023" },
  { id: "rnb-006", genre: "rnb", difficulty: "facile", artist: "Muni Long", title: "Made for Me", prompt: "Qui est l'artiste du titre 'Made for Me' ?", acceptedAnswers: ["Muni Long", "muni long"], hints: ["C'est une voix très reconnaissable du R&B moderne.", "Le titre est dans les playlists actuelles.", "Son univers est doux et intime."], explanation: "Muni Long a sorti 'Made for Me'.", source: "Singles récents" },
  { id: "rnb-007", genre: "rnb", difficulty: "facile", artist: "Summer Walker", title: "Girls Need Love", prompt: "Qui interprète 'Girls Need Love' ?", acceptedAnswers: ["Summer Walker", "summer walker"], hints: ["C'est une chanteuse R&B très connue.", "Elle a beaucoup marqué le courant moderne.", "Le morceau est très adopté sur les plateformes."], explanation: "Summer Walker est l'interprète de 'Girls Need Love'.", source: "Singles 2020" },
  { id: "rnb-008", genre: "rnb", difficulty: "facile", artist: "The Weeknd", title: "Save Your Tears", prompt: "Qui chante 'Save Your Tears' ?", acceptedAnswers: ["The Weeknd", "the weeknd"], hints: ["C'est une figure majeure du pop/R&B.", "Le morceau a connu un énorme succès.", "Il est très présent sur les radios."], explanation: "The Weeknd est l'artiste de 'Save Your Tears'.", source: "Singles 2020" },
  { id: "rnb-009", genre: "rnb", difficulty: "moyen", artist: "Usher", title: "DJ Got Us Fallin' in Love", prompt: "Qui est l'artiste de 'DJ Got Us Fallin' in Love' ?", acceptedAnswers: ["Usher", "usher"], hints: ["Il est très connu dans le R&B des années 2000.", "Le morceau est très dance.", "Il a sorti plusieurs grands succès."], explanation: "Usher est l'artiste de 'DJ Got Us Fallin' in Love'.", source: "Singles 2004" },
  { id: "rnb-010", genre: "rnb", difficulty: "moyen", artist: "Bruno Mars", title: "That's What I Like", prompt: "Qui chante 'That's What I Like' ?", acceptedAnswers: ["Bruno Mars", "bruno mars"], hints: ["C'est un artiste pop très influent.", "Le morceau est très associé au R&B et au funk.", "Il a sorti '24K Magic'."], explanation: "Bruno Mars interprète 'That's What I Like'.", source: "Album 24K Magic" },
  { id: "rnb-011", genre: "rnb", difficulty: "moyen", artist: "Alicia Keys", title: "No One", prompt: "Quelle artiste interprète 'No One' ?", acceptedAnswers: ["Alicia Keys", "alicia keys"], hints: ["C'est une chanteuse de renommée mondiale.", "Le morceau est un classique du R&B soul.", "Elle a aussi sorti 'If I Ain't Got You'."], explanation: "Alicia Keys est la chanteuse de 'No One'.", source: "Singles 2007" },
  { id: "rnb-012", genre: "rnb", difficulty: "moyen", artist: "Chris Brown", title: "No Guidance", prompt: "Qui chante 'No Guidance' avec Drake ?", acceptedAnswers: ["Chris Brown", "chris brown"], hints: ["C'est un chanteur et danseur très connu.", "Le titre est sorti en 2019.", "Il a collaboré avec Drake."], explanation: "Chris Brown est l'artiste principal de 'No Guidance'.", source: "Singles 2019" },
  { id: "rnb-013", genre: "rnb", difficulty: "moyen", artist: "Giveon", title: "Heartbreak Anniversary", prompt: "Qui est derrière 'Heartbreak Anniversary' ?", acceptedAnswers: ["Giveon", "giveon"], hints: ["C'est un artiste très présent dans le R&B de la décennie.", "Le morceau a un impact très fort dans les playlists.", "Son univers est très doux."], explanation: "Giveon interprète 'Heartbreak Anniversary'.", source: "Singles 2020" },
  { id: "rnb-014", genre: "rnb", difficulty: "moyen", artist: "H.E.R.", title: "Best Part", prompt: "Qui interprète 'Best Part' avec Daniel Caesar ?", acceptedAnswers: ["H.E.R.", "her"], hints: ["C'est une artiste très appréciée dans le R&B contemporain.", "Le titre est très riche musicalement.", "Elle est souvent associée à la soul."], explanation: "H.E.R. est l'interprète de 'Best Part'.", source: "Singles 2018" },
  { id: "rnb-015", genre: "rnb", difficulty: "moyen", artist: "SZA", title: "Good Days", prompt: "Quel artiste a sorti 'Good Days' ?", acceptedAnswers: ["SZA", "sza"], hints: ["C'est une figure du R&B contemporain.", "Le morceau est très mélodique.", "Elle a sorti des titres comme 'Snooze'."], explanation: "SZA est l'artiste de 'Good Days'.", source: "Singles 2018" },
  { id: "rnb-016", genre: "rnb", difficulty: "moyen", artist: "Rihanna", title: "Needed Me", prompt: "Qui chante 'Needed Me' ?", acceptedAnswers: ["Rihanna", "rihanna"], hints: ["C'est une star internationale du R&B et de la pop.", "Le morceau est très connu dans les clubs.", "Elle a eu de nombreux succès mondiaux."], explanation: "Rihanna est l'interprète de 'Needed Me'.", source: "Singles 2016" },
  { id: "rnb-017", genre: "rnb", difficulty: "difficile", artist: "Bryson Tiller", title: "Exchange", prompt: "Qui interprète 'Exchange' ?", acceptedAnswers: ["Bryson Tiller", "bryson tiller"], hints: ["C'est un artiste très connu dans le R&B urbain.", "Le titre est sorti au milieu des années 2010.", "Son univers est influencé par la soul."], explanation: "Bryson Tiller est l'artiste de 'Exchange'.", source: "Singles 2015" },
  { id: "rnb-018", genre: "rnb", difficulty: "difficile", artist: "Jhené Aiko", title: "Sativa", prompt: "Qui chante 'Sativa' ?", acceptedAnswers: ["Jhené Aiko", "jhene aiko"], hints: ["C'est une chanteuse R&B alternative.", "Le morceau est très mélodique.", "Elle est associée à un univers visuel très doux."], explanation: "Jhené Aiko interprète 'Sativa'.", source: "Singles / catalogue 2014" },
  { id: "rnb-019", genre: "rnb", difficulty: "difficile", artist: "Tory Lanez", title: "Say It", prompt: "Qui interprète 'Say It' ?", acceptedAnswers: ["Tory Lanez", "tory lanez"], hints: ["C'est un rappeur et chanteur très présent dans la scène américaine.", "Le morceau est identifié comme un hit R&B.", "Ses sons sont très mélodiques."], explanation: "Tory Lanez est l'artiste de 'Say It'.", source: "Singles 2019" },
  { id: "rnb-020", genre: "rnb", difficulty: "difficile", artist: "Ariana Grande", title: "Positions", prompt: "Qui chante 'Positions' ?", acceptedAnswers: ["Ariana Grande", "ariana grande"], hints: ["C'est une super chanteuse pop/R&B.", "Le morceau a connu un grand succès.", "Elle s'est illustrée dans plusieurs styles."], explanation: "Ariana Grande est l'interprète de 'Positions'.", source: "Singles 2020" },
  { id: "rnb-021", genre: "rnb", difficulty: "difficile", artist: "Miguel", title: "Sure Thing", prompt: "Quel artiste a sorti 'Sure Thing' ?", acceptedAnswers: ["Miguel", "miguel"], hints: ["C'est un artiste R&B de référence.", "Le titre est un classique moderne.", "Il a eu plusieurs succès depuis les années 2010."], explanation: "Miguel est derrière 'Sure Thing'.", source: "Singles 2010" },
  { id: "rnb-022", genre: "rnb", difficulty: "difficile", artist: "Partynextdoor", title: "Come and See Me", prompt: "Qui chante 'Come and See Me' ?", acceptedAnswers: ["PARTYNEXTDOOR", "partynextdoor"], hints: ["C'est un artiste de la scène R&B/rap.", "Le morceau a connu un succès notable.", "Son nom est souvent écrit sans espace."], explanation: "PARTYNEXTDOOR est l'artiste de 'Come and See Me'.", source: "Singles 2016" },
  { id: "rnb-023", genre: "rnb", difficulty: "difficile", artist: "Frank Ocean", title: "Thinkin Bout You", prompt: "Qui interprète 'Thinkin Bout You' ?", acceptedAnswers: ["Frank Ocean", "frank ocean"], hints: ["C'est un artiste à la voix très identifiable.", "Le morceau est un classique du R&B moderne.", "Il a travaillé sur plusieurs albums très réputés."], explanation: "Frank Ocean est l'auteur de 'Thinkin Bout You'.", source: "Singles 2012" },
  { id: "kompa-001", genre: "kompa", difficulty: "facile", artist: "Mikaben", title: "C'est la vie", prompt: "Qui chante le titre 'C'est la vie' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un artiste très connu dans le kompa haïtien.", "Le morceau est très dansant.", "Il est associé à la scène caribéenne moderne."], explanation: "Mikaben est l'interprète de 'C'est la vie'.", source: "Scène kompa haïtienne" },
  { id: "kompa-002", genre: "kompa", difficulty: "facile", artist: "Mikaben", title: "Mélodie", prompt: "Quel artiste est associé au morceau 'Mélodie' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["Il est l'un des noms majeurs du kompa.", "Son style associe groove et énergie scénique.", "Il est très présent dans la musique haïtienne."], explanation: "Mikaben est très lié au morceau 'Mélodie'.", source: "Scène kompa / albums" },
  { id: "kompa-003", genre: "kompa", difficulty: "facile", artist: "Mikaben", title: "Joujou", prompt: "Qui est connu pour les morceaux 'Joujou' et 'Mélodie' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["Il est un acteur important du kompa moderne.", "Sa musique est très dansante.", "Il est largement présent dans les scènes caribéennes."], explanation: "Mikaben est l'artiste connu pour 'Joujou' et 'Mélodie'.", source: "Catalogue kompa haïtien" },
  { id: "kompa-004", genre: "kompa", difficulty: "facile", artist: "T-Vice", title: "Caribbean Queen", prompt: "Quel artiste est associé à la chanson 'Caribbean Queen' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], hints: ["C'est un artiste emblématique du kompa moderne.", "Le titre a une forte identité caribéenne.", "Son univers est très festif."], explanation: "T-Vice est associé à 'Caribbean Queen'.", source: "Scène kompa / singles" },
  { id: "kompa-005", genre: "kompa", difficulty: "facile", artist: "T-Vice", title: "Rêve", prompt: "Qui interprète 'Rêve' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], hints: ["Il est très connu en Haïti.", "Le titre est dansant et très mémorable.", "Il est associé à la culture kompa."], explanation: "T-Vice est l'artiste de 'Rêve'.", source: "Scène kompa haïtienne" },
  { id: "kompa-006", genre: "kompa", difficulty: "facile", artist: "Carimi", title: "Aucune", prompt: "Quel artiste est lié à la scène kompa haïtienne et souvent cité comme figure emblématique ?", acceptedAnswers: ["Carimi", "carimi"], hints: ["Il est connu dans le kompa moderne.", "Son univers est très associé à la culture haïtienne.", "Le titre est souvent présent dans les playlists de danse."], explanation: "Carimi est un artiste très apprécié de la scène kompa haïtienne.", source: "Scène kompa / artistes emblématiques" },
  { id: "kompa-007", genre: "kompa", difficulty: "moyen", artist: "Mikaben", title: "Pa gen", prompt: "Qui est l'artiste derrière 'Pa gen' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["Il est reconnu pour beaucoup de titres dansants.", "Le morceau est très présent sur les scènes de fête.", "Il est régulièrement cité parmi les grands noms du kompa."], explanation: "Mikaben est l'artiste de 'Pa gen'.", source: "Singles haïtiens" },
  { id: "kompa-008", genre: "kompa", difficulty: "moyen", artist: "T-Vice", title: "Vibe", prompt: "Quel artiste est connu pour le morceau 'Vibe' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], hints: ["Il est reconnu pour son énergie scénique.", "Le morceau est très festif.", "Il appartient à la scène kompa haïtienne."], explanation: "T-Vice est connu pour 'Vibe'.", source: "Scène kompa / titres récents" },
  { id: "kompa-009", genre: "kompa", difficulty: "moyen", artist: "Malandra", title: "Kombit", prompt: "Quel artiste est associé à 'Kombit' ?", acceptedAnswers: ["Malandra", "malandra"], hints: ["Il est associé à la scène kompa caribéenne.", "Le titre est très dansant.", "Le style est festif et reconnu."], explanation: "Malandra est l'artiste de 'Kombit'.", source: "Catalogue kompa" },
  { id: "kompa-010", genre: "kompa", difficulty: "moyen", artist: "Mikaben", title: "Toujou", prompt: "Qui interprète le titre 'Toujou' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un artiste très influent du kompa haïtien.", "Le titre est festif et très dance.", "Il est l'un des plus grands noms du genre."], explanation: "Mikaben est l'interprète de 'Toujou'.", source: "Singles kompa" },
  { id: "kompa-011", genre: "kompa", difficulty: "moyen", artist: "Carimi", title: "La vie", prompt: "Quel artiste chante 'La vie' ?", acceptedAnswers: ["Carimi", "carimi"], hints: ["Il est très connu dans la scène haïtienne.", "Son style est lié au kompa.", "Le titre est très écouté dans les fêtes."], explanation: "Carimi est l'artiste de 'La vie'.", source: "Scène kompa haïtienne" },
  { id: "kompa-012", genre: "kompa", difficulty: "moyen", artist: "T-Vice", title: "Pape", prompt: "Qui est à l'origine de la chanson 'Pape' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], hints: ["Il est très reconnu dans la culture musicienne haïtienne.", "Le titre a une forte identité de scène.", "Il est fortement associé au kompa moderne."], explanation: "T-Vice est derrière 'Pape'.", source: "Singles / culture kompa" },
  { id: "kompa-013", genre: "kompa", difficulty: "moyen", artist: "T-Vice", title: "Madan", prompt: "Quel artiste est derrière 'Madan' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], hints: ["C'est un nom essentiel du kompa moderne.", "Son univers est très visible sur scène.", "Le titre est associé à la danse."], explanation: "T-Vice est l'interprète de 'Madan'.", source: "Scène kompa" },
  { id: "kompa-014", genre: "kompa", difficulty: "moyen", artist: "Mikaben", title: "Resto", prompt: "Qui chante 'Resto' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est l'un des piliers de la scène kompa.", "Le morceau est très diffusé.", "Le style est très dansant et festif."], explanation: "Mikaben est l'artiste de 'Resto'.", source: "Singles haïtiens" },
  { id: "kompa-015", genre: "kompa", difficulty: "difficile", artist: "Mikaben", title: "Sainte Marie", prompt: "Quel artiste est derrière 'Sainte Marie' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["Il est un des plus grands noms du kompa.", "Le morceau a une forte présence dans les sorties haïtiennes.", "Le style est très reconnaissable."], explanation: "Mikaben est l'artiste de 'Sainte Marie'.", source: "Catalogue kompa haïtien" },
  { id: "kompa-016", genre: "kompa", difficulty: "difficile", artist: "T-Vice", title: "L'amour", prompt: "Qui interprète 'L'amour' dans la scène kompa haïtienne ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], hints: ["C'est un des grands piliers du kompa moderne.", "Le titre est très associée à l'énergie scénique.", "Il est très populaire dans les fêtes."], explanation: "T-Vice est l'interprète de 'L'amour'.", source: "scène kompa / singles" },
  { id: "kompa-017", genre: "kompa", difficulty: "difficile", artist: "Carimi", title: "Danse", prompt: "Quel artiste est associé au titre 'Danse' ?", acceptedAnswers: ["Carimi", "carimi"], hints: ["Il fait partie des artistes reconnus du kompa.", "Le titre est très lié à la culture de fête et de danse.", "Son univers est très caribéen."], explanation: "Carimi est l'artiste associé à 'Danse'.", source: "Scène kompa" },
  { id: "kompa-018", genre: "kompa", difficulty: "difficile", artist: "Mikaben", title: "Mélodie 2", prompt: "Qui est derrière 'Mélodie 2' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un nom majeur du kompa.", "Le titre reprend une identité très dansante.", "Il est très présent dans la scène haïtienne."], explanation: "Mikaben est l'artiste de 'Mélodie 2'.", source: "Singles / médias haïtiens" },
  { id: "kompa-019", genre: "kompa", difficulty: "difficile", artist: "T-Vice", title: "Légende", prompt: "Quel artiste est connu pour le morceau 'Légende' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], hints: ["Il est très reconnu dans le kompa moderne haïtien.", "Le morceau est très présent dans les festivals.", "Son univers est festif et dynamique."], explanation: "T-Vice est l'artiste de 'Légende'.", source: "Scène kompa / diffusion" },
  { id: "kompa-020", genre: "kompa", difficulty: "difficile", artist: "Mikaben", title: "Soleil", prompt: "Qui interprète 'Soleil' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un artiste très populaire du kompa.", "Son style est dynamique et joyeux.", "Le morceau est souvent diffusé dans les soirées."], explanation: "Mikaben est l'interprète de 'Soleil'.", source: "Catalogues / hits haïtiens" }
];

const difficultyConfig = {
  facile: { label: "Facile", totalQuestions: 8, maxHints: 2 },
  moyen: { label: "Moyen", totalQuestions: 8, maxHints: 3 },
  difficile: { label: "Difficile", totalQuestions: 8, maxHints: 4 }
};

const state = {
  score: 0,
  round: 0,
  currentQuestion: null,
  currentHintIndex: 0,
  questions: [],
  locked: false,
  selectedGenre: "tous",
  selectedDifficulty: "facile",
  skipPending: false,
  seenQuestionIds: []
};

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");
const clueText = document.getElementById("clueText");
const answerInput = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const scoreBadge = document.getElementById("scoreBadge");
const roundBadge = document.getElementById("roundBadge");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const answerForm = document.getElementById("answerForm");
const endTitle = document.getElementById("endTitle");
const endMessage = document.getElementById("endMessage");
const genreButtons = document.querySelectorAll(".genre-btn");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");
const skipBtn = document.getElementById("skipBtn");

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function setFeedback(message, type = "") {
  feedback.textContent = message;
  feedback.className = `feedback ${type}`.trim();
}

function getQuestionsForSelectedGenre() {
  if (state.selectedGenre === "tous") {
    return quizQuestions.filter((question) => question.difficulty === state.selectedDifficulty);
  }

  return quizQuestions.filter(
    (question) => question.genre === state.selectedGenre && question.difficulty === state.selectedDifficulty
  );
}

function updateDifficultyStats() {
  const config = difficultyConfig[state.selectedDifficulty];
  const availableQuestions = getQuestionsForSelectedGenre();
  const total = Math.min(config.totalQuestions, availableQuestions.length || config.totalQuestions);

  document.getElementById("totalQuestionsValue").textContent = String(total);
  document.getElementById("hintCountValue").textContent = String(config.maxHints);
  document.getElementById("difficultyValue").textContent = config.label;
}

function selectGenre(genre) {
  state.selectedGenre = genre;

  genreButtons.forEach((button) => {
    const isActive = button.dataset.genre === genre;
    button.classList.toggle("active", isActive);
  });

  updateDifficultyStats();
}

function selectDifficulty(level) {
  state.selectedDifficulty = level;

  difficultyButtons.forEach((button) => {
    const isActive = button.dataset.difficulty === level;
    button.classList.toggle("active", isActive);
  });

  updateDifficultyStats();
}

function buildRoundQuestions(availableQuestions, maxCount) {
  const selected = [];
  const usedIds = new Set();
  let previousArtist = "";

  const pool = shuffle(availableQuestions);

  for (const question of pool) {
    if (selected.length >= maxCount) break;
    if (usedIds.has(question.id)) continue;

    const currentArtist = normalize(question.artist || "");
    if (previousArtist && currentArtist && currentArtist === previousArtist) continue;

    selected.push(question);
    usedIds.add(question.id);
    previousArtist = currentArtist || previousArtist;
  }

  if (selected.length < maxCount) {
    const fallback = shuffle(pool.filter((question) => !usedIds.has(question.id)));
    for (const question of fallback) {
      if (selected.length >= maxCount) break;
      selected.push(question);
      usedIds.add(question.id);
    }
  }

  return selected.slice(0, maxCount);
}

function startGame() {
  const availableQuestions = shuffle(getQuestionsForSelectedGenre());

  if (availableQuestions.length === 0) {
    setFeedback("Aucune question disponible pour ce genre et cette difficulté. Choisis autre chose.", "error");
    return;
  }

  const config = difficultyConfig[state.selectedDifficulty];
  const totalRounds = Math.min(config.totalQuestions, availableQuestions.length);

  state.score = 0;
  state.round = 0;
  state.questions = buildRoundQuestions(availableQuestions, totalRounds);
  state.locked = false;
  state.skipPending = false;
  state.seenQuestionIds = [];

  startScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  restartBtn.classList.remove("hidden");

  showRound();
}

function showRound() {
  const question = state.questions[state.round];
  if (!question) {
    finishGame();
    return;
  }

  state.currentQuestion = question;
  state.currentHintIndex = 0;
  state.locked = false;
  state.skipPending = false;
  answerInput.disabled = false;
  skipBtn.disabled = false;

  scoreBadge.textContent = `Score : ${state.score}`;
  roundBadge.textContent = `Question ${state.round + 1} / ${state.questions.length}`;
  clueText.textContent = question.prompt;
  answerInput.value = "";
  answerInput.focus();
  setFeedback("");
}

function revealNextHint() {
  const question = state.currentQuestion;
  const hints = question.hints || [];
  state.currentHintIndex += 1;
  clueText.textContent = hints[state.currentHintIndex] || question.prompt;

  if (state.currentHintIndex < hints.length - 1) {
    setFeedback(`Raté ! Voici un indice supplémentaire (${state.currentHintIndex + 1}/${hints.length}).`, "error");
  } else {
    setFeedback("Dernier indice : c'est presque ça !", "error");
  }
}

function advanceRound() {
  state.round += 1;

  if (state.round >= state.questions.length) {
    finishGame();
    return;
  }

  showRound();
}

function finishGame() {
  gameScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  skipBtn.disabled = true;

  const maxScore = (state.questions.length || 1) * 100;
  endTitle.textContent = "Partie terminée";
  endMessage.textContent = `Ton score final : ${state.score} / ${maxScore} points.`;
}

function checkAnswer() {
  const userGuess = normalize(answerInput.value);
  const question = state.currentQuestion;
  const acceptedAnswers = question.acceptedAnswers.map(normalize);

  if (acceptedAnswers.includes(userGuess)) {
    const points = Math.max(20, 100 - state.currentHintIndex * 20);
    state.score += points;
    scoreBadge.textContent = `Score : ${state.score}`;
    setFeedback(`Bravo ! C'était ${question.acceptedAnswers[0]}.`, "success");
    state.locked = true;
    skipBtn.disabled = true;
    answerInput.disabled = true;

    setTimeout(() => {
      advanceRound();
    }, 1400);

    return;
  }

  const maxHints = difficultyConfig[state.selectedDifficulty].maxHints;
  const hints = question.hints || [];

  if (state.currentHintIndex < maxHints - 1 && state.currentHintIndex < hints.length - 1) {
    revealNextHint();
    return;
  }

  setFeedback(`Perdu ! La bonne réponse était ${question.acceptedAnswers[0]}.`, "error");
  state.locked = true;
  skipBtn.disabled = true;
  answerInput.disabled = true;

  setTimeout(() => {
    advanceRound();
  }, 1800);
}

function skipQuestion() {
  if (state.locked || !state.currentQuestion || state.skipPending) {
    return;
  }

  state.locked = true;
  state.skipPending = true;
  skipBtn.disabled = true;
  answerInput.disabled = true;

  setFeedback("Question passée. On continue !", "info");

  setTimeout(() => {
    advanceRound();
  }, 450);
}

genreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectGenre(button.dataset.genre);
  });
});

difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectDifficulty(button.dataset.difficulty);
  });
});

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (state.locked) {
    return;
  }

  checkAnswer();
});

startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
skipBtn.addEventListener("click", skipQuestion);

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    answerForm.requestSubmit();
  }
});

window.addEventListener("load", () => {
  selectGenre("tous");
  selectDifficulty("facile");
  updateDifficultyStats();
  startScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  restartBtn.classList.add("hidden");
  skipBtn.disabled = true;
});
