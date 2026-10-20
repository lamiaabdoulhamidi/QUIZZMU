const quizQuestions = [
  { id: "rap-001", genre: "rap", difficulty: "facile", artist: "Kendrick Lamar", title: "Not Like Us", prompt: "Qui chante la chanson 'Not Like Us' ?", acceptedAnswers: ["Kendrick Lamar", "kendrick lamar"], explanation: "Kendrick Lamar a sorti 'Not Like Us' en 2024 et le morceau est devenu un immense succès." , source: "Singles et classements musicaux 2024" },
  { id: "rap-002", genre: "rap", difficulty: "facile", artist: "Kendrick Lamar", title: "HUMBLE.", prompt: "Qui est l'artiste de 'HUMBLE.' ?", acceptedAnswers: ["Kendrick Lamar", "kendrick lamar"], explanation: "'HUMBLE.' est l'un des titres majeurs de Kendrick Lamar, sorti en 2017.", source: "Album DAMN. / streaming 2017" },
  { id: "rap-003", genre: "rap", difficulty: "facile", artist: "Eminem", title: "Houdini", prompt: "Qui a sorti le single 'Houdini' ?", acceptedAnswers: ["Eminem", "eminem"], explanation: "Eminem a présenté 'Houdini' comme un retour marquant sur la scène rap en 2024.", source: "Singles 2024 / sorties officielles" },
  { id: "rap-004", genre: "rap", difficulty: "facile", artist: "Kendrick Lamar", title: "Luther", prompt: "Qui chante 'Luther' avec SZA ?", acceptedAnswers: ["Kendrick Lamar", "kendrick lamar"], explanation: "'Luther' est un morceau phare de Kendrick Lamar et SZA sorti en 2024.", source: "Singles 2024" },
  { id: "rap-005", genre: "rap", difficulty: "facile", artist: "Travis Scott", title: "SICKO MODE", prompt: "Qui est l'artiste du titre 'SICKO MODE' ?", acceptedAnswers: ["Travis Scott", "travis scott"], explanation: "Le morceau est signé Travis Scott et apparaît sur son album 'Astroworld'.", source: "Album Astroworld / streaming" },
  { id: "rap-006", genre: "rap", difficulty: "facile", artist: "Drake", title: "God's Plan", prompt: "Qui chante 'God's Plan' ?", acceptedAnswers: ["Drake", "drake"], explanation: "'God's Plan' est un titre emblématique de Drake sorti en 2018.", source: "Singles 2018 / classements" },
  { id: "rap-007", genre: "rap", difficulty: "facile", artist: "Drake", title: "Laugh Now Cry Later", prompt: "Quel rappeur interprète 'Laugh Now Cry Later' ?", acceptedAnswers: ["Drake", "drake"], explanation: "La chanson met en avant Drake aux côtés de Lil Durk.", source: "Singles 2020" },
  { id: "rap-008", genre: "rap", difficulty: "facile", artist: "The Weeknd", title: "One Right Now", prompt: "Qui interprète 'One Right Now' avec Post Malone ?", acceptedAnswers: ["The Weeknd", "the weeknd"], explanation: "'One Right Now' est une collaboration entre The Weeknd et Post Malone.", source: "Singles 2021" },
  { id: "rap-009", genre: "rap", difficulty: "moyen", artist: "Baby Keem", title: "The Hillbillies", prompt: "Quel rappeur est derrière le titre 'The Hillbillies' ?", acceptedAnswers: ["Baby Keem", "baby keem"], explanation: "Baby Keem est le rappeur principal de ce morceau avec Kendrick Lamar en featuring.", source: "Single 2024 / streaming" },
  { id: "rap-010", genre: "rap", difficulty: "moyen", artist: "Gunna", title: "Fukumean", prompt: "Qui est l'artiste du titre 'Fukumean' ?", acceptedAnswers: ["Gunna", "gunna"], explanation: "'Fukumean' est un succès notable de Gunna sorti en 2023.", source: "Singles 2023" },
  { id: "rap-011", genre: "rap", difficulty: "moyen", artist: "J. Cole", title: "First Time", prompt: "Quel artiste a sorti 'First Time' ?", acceptedAnswers: ["J. Cole", "j cole"], explanation: "J. Cole est le rappeur derrière ce titre et le morceau a marqué les playlists rap." , source: "Singles / versions officielles" },
  { id: "rap-012", genre: "rap", difficulty: "moyen", artist: "Future", title: "Wait For U", prompt: "Qui chante 'Wait For U' avec Drake et Tems ?", acceptedAnswers: ["Future", "future"], explanation: "Le morceau est porté par Future, avec Drake et Tems en collaborations.", source: "Album I NEVER LIKED YOU / 2022" },
  { id: "rap-013", genre: "rap", difficulty: "moyen", artist: "Travis Scott", title: "Goosebumps", prompt: "Quel rappeur est associé à 'Goosebumps' ?", acceptedAnswers: ["Travis Scott", "travis scott"], explanation: "'Goosebumps' fait partie de l'album 'Birds in the Trap Sing McKnight'.", source: "Album 2016" },
  { id: "rap-014", genre: "rap", difficulty: "moyen", artist: "Metro Boomin", title: "Superhero", prompt: "Qui est l'artiste de 'Superhero' avec Future et Chris Brown ?", acceptedAnswers: ["Metro Boomin", "metro boomin"], explanation: "Metro Boomin a produit et présenté ce titre avec Future et Chris Brown.", source: "Singles 2023 / production" },
  { id: "rap-015", genre: "rap", difficulty: "moyen", artist: "Lil Baby", title: "Freestyle", prompt: "Quel artiste est connu pour le morceau 'Freestyle' en 2022 ?", acceptedAnswers: ["Lil Baby", "lil baby"], explanation: "Lil Baby a été très présent dans les hit-parades rap avec ce titre.", source: "Singles 2022" },
  { id: "rap-016", genre: "rap", difficulty: "moyen", artist: "Doja Cat", title: "Attention", prompt: "Qui interprète 'Attention' ?", acceptedAnswers: ["Doja Cat", "doja cat"], explanation: "La chanteuse et rappeuse Doja Cat a sorti ce titre très populaire.", source: "Singles 2023 / artistes hybrides" },
  { id: "rap-017", genre: "rap", difficulty: "difficile", artist: "Kanye West", title: "Carnival", prompt: "Quel artiste est derrière 'Carnival' avec Playboi Carti et Ty Dolla $ign ?", acceptedAnswers: ["Kanye West", "kanye west"], explanation: "Le morceau est produit par Kanye West et visible sur son album 'Vultures'.", source: "Album Vultures / 2024" },
  { id: "rap-018", genre: "rap", difficulty: "difficile", artist: "Playboi Carti", title: "Good Credit", prompt: "Qui interprète 'Good Credit' ?", acceptedAnswers: ["Playboi Carti", "playboi carti"], explanation: "Playboi Carti est connu pour son univers trap et sa présence sur ce titre.", source: "Singles / scènes rap actuelles" },
  { id: "rap-019", genre: "rap", difficulty: "difficile", artist: "Young Thug", title: "Lifestyle", prompt: "Quel artiste est associé au titre 'Lifestyle' ?", acceptedAnswers: ["Young Thug", "young thug"], explanation: "'Lifestyle' est devenu l'un des morceaux emblématiques de Young Thug.", source: "Album / singles 2018" },
  { id: "rap-020", genre: "rap", difficulty: "difficile", artist: "NLE Choppa", title: "Slut Me Out", prompt: "Qui chante 'Slut Me Out' ?", acceptedAnswers: ["NLE Choppa", "nle choppa"], explanation: "NLE Choppa a popularisé ce morceau dans le rap contemporain américain.", source: "Singles 2023" },
  { id: "rap-021", genre: "rap", difficulty: "difficile", artist: "A$AP Rocky", title: "Praise The Lord", prompt: "Qui chante 'Praise The Lord' avec Skepta ?", acceptedAnswers: ["A$AP Rocky", "asap rocky", "a$ap rocky"], explanation: "A$AP Rocky est l'artiste principal de ce titre très diffusé mondialement.", source: "Singles 2018" },
  { id: "rap-022", genre: "rap", difficulty: "difficile", artist: "Migos", title: "MotorSport", prompt: "Quel groupe est à l'origine de 'MotorSport' ?", acceptedAnswers: ["Migos", "migos"], explanation: "Migos est connu pour ce titre avec Nicki Minaj et Cardi B.", source: "Singles 2018" },
  { id: "rap-023", genre: "rap", difficulty: "difficile", artist: "Cardi B", title: "WAP", prompt: "Qui interprète 'WAP' avec Megan Thee Stallion ?", acceptedAnswers: ["Cardi B", "cardi b"], explanation: "'WAP' est une collaboration entre Cardi B et Megan Thee Stallion." , source: "Singles 2020" },
  { id: "rap-024", genre: "rap", difficulty: "difficile", artist: "Lil Uzi Vert", title: "Just Wanna Rock", prompt: "Qui a sorti 'Just Wanna Rock' ?", acceptedAnswers: ["Lil Uzi Vert", "lil uzi vert"], explanation: "Lil Uzi Vert a popularisé ce morceau dans le rap et le trap moderne.", source: "Singles 2023" },
  { id: "rap-025", genre: "rap", difficulty: "difficile", artist: "21 Savage", title: "Redrum", prompt: "Quel artiste est derrière 'Redrum' ?", acceptedAnswers: ["21 Savage", "21 savage"], explanation: "21 Savage a sorti ce morceau dans la vague rap américaine récente.", source: "Singles 2024 / rap actuel" },
  { id: "pop-001", genre: "pop", difficulty: "facile", artist: "Sabrina Carpenter", title: "Espresso", prompt: "Qui chante 'Espresso' ?", acceptedAnswers: ["Sabrina Carpenter", "sabrina carpenter"], explanation: "Sabrina Carpenter a imposé 'Espresso' comme l'un des plus gros succès pop de 2024.", source: "Singles 2024 / charts mondiaux" },
  { id: "pop-002", genre: "pop", difficulty: "facile", artist: "Benson Boone", title: "Beautiful Things", prompt: "Quel artiste a sorti 'Beautiful Things' ?", acceptedAnswers: ["Benson Boone", "benson boone"], explanation: "Benson Boone est l'interprète du morceau très diffusé sur les radios.", source: "Singles 2024" },
  { id: "pop-003", genre: "pop", difficulty: "facile", artist: "Rosé", title: "Apt.", prompt: "Qui chante 'Apt.' ?", acceptedAnswers: ["Rosé", "rose", "rosé"], explanation: "Le titre est interprété par Rosé, en collaboration avec Bruno Mars.", source: "Singles 2024" },
  { id: "pop-004", genre: "pop", difficulty: "facile", artist: "Billie Eilish", title: "Birds of a Feather", prompt: "Quel artiste est derrière le titre 'Birds of a Feather' ?", acceptedAnswers: ["Billie Eilish", "billie eilish"], explanation: "Billie Eilish a sorti 'Birds of a Feather' au début des années 2020.", source: "Singles 2024" },
  { id: "pop-005", genre: "pop", difficulty: "facile", artist: "Hozier", title: "Too Sweet", prompt: "Qui a sorti 'Too Sweet' ?", acceptedAnswers: ["Hozier", "hozier"], explanation: "Hozier est l'auteur de la chanson qui a connu un fort engouement pop.", source: "Singles 2024" },
  { id: "pop-006", genre: "pop", difficulty: "facile", artist: "Sabrina Carpenter", title: "Please Please Please", prompt: "Quel artiste chante 'Please Please Please' ?", acceptedAnswers: ["Sabrina Carpenter", "sabrina carpenter"], explanation: "Sabrina Carpenter a imposé ce titre comme un énorme succès pop." , source: "Singles 2024" },
  { id: "pop-007", genre: "pop", difficulty: "facile", artist: "Taylor Swift", title: "Fortnight", prompt: "Qui interprète 'Fortnight' ?", acceptedAnswers: ["Taylor Swift", "taylor swift"], explanation: "Taylor Swift et Post Malone ont donné vie à 'Fortnight'.", source: "Album The Tortured Poets Department / 2024" },
  { id: "pop-008", genre: "pop", difficulty: "facile", artist: "Olivia Rodrigo", title: "obsessed", prompt: "Qui chante 'obsessed' ?", acceptedAnswers: ["Olivia Rodrigo", "olivia rodrigo"], explanation: "Olivia Rodrigo a sorti 'obsessed' dans un univers pop très moderne.", source: "Singles 2024" },
  { id: "pop-009", genre: "pop", difficulty: "moyen", artist: "Lady Gaga", title: "Abracadabra", prompt: "Qui est l'artiste de 'Abracadabra' ?", acceptedAnswers: ["Lady Gaga", "lady gaga"], explanation: "Lady Gaga a réintroduit un son pop très dansé avec ce titre.", source: "Singles 2025" },
  { id: "pop-010", genre: "pop", difficulty: "moyen", artist: "Miley Cyrus", title: "Flowers", prompt: "Quelle chanteuse a sorti 'Flowers' ?", acceptedAnswers: ["Miley Cyrus", "miley cyrus"], explanation: "Miley Cyrus a porté ce morceau en tête de classements dans le monde entier.", source: "Singles 2023" },
  { id: "pop-011", genre: "pop", difficulty: "moyen", artist: "The Weeknd", title: "Blinding Lights", prompt: "Qui interprète 'Blinding Lights' ?", acceptedAnswers: ["The Weeknd", "the weeknd"], explanation: "The Weeknd a conquis le monde avec ce succès synthwave pop.", source: "Singles 2020" },
  { id: "pop-012", genre: "pop", difficulty: "moyen", artist: "Ariana Grande", title: "yes, and?", prompt: "Qui chante 'yes, and ?' ?", acceptedAnswers: ["Ariana Grande", "ariana grande"], explanation: "Ariana Grande est l'artiste de ce titre pop très marqué par son style vocal.", source: "Singles 2024" },
  { id: "pop-013", genre: "pop", difficulty: "moyen", artist: "Daft Punk", title: "Get Lucky", prompt: "Qui est derrière 'Get Lucky' ?", acceptedAnswers: ["Daft Punk", "daft punk"], explanation: "'Get Lucky' est un morceau phare de Daft Punk avec Pharrell Williams et Nile Rodgers.", source: "Album Random Access Memories / 2013" },
  { id: "pop-014", genre: "pop", difficulty: "moyen", artist: "Adele", title: "Easy On Me", prompt: "Qui interprète 'Easy On Me' ?", acceptedAnswers: ["Adele", "adele"], explanation: "Adele est à la tête de ce morceau très grand public.", source: "Singles 2021" },
  { id: "pop-015", genre: "pop", difficulty: "moyen", artist: "Rihanna", title: "Umbrella", prompt: "Qui chante 'Umbrella' ?", acceptedAnswers: ["Rihanna", "rihanna"], explanation: "Rihanna a popularisé 'Umbrella' comme l'un des plus grands tubes mondiaux.", source: "Singles 2007" },
  { id: "pop-016", genre: "pop", difficulty: "moyen", artist: "Måneskin", title: "Beggin'", prompt: "Quel groupe interprète 'Beggin'' ?", acceptedAnswers: ["Måneskin", "maneskin"], explanation: "Le groupe italien Måneskin a repris et popularisé ce titre.", source: "Singles 2021" },
  { id: "pop-017", genre: "pop", difficulty: "difficile", artist: "Katy Perry", title: "Dark Horse", prompt: "Qui chante 'Dark Horse' ?", acceptedAnswers: ["Katy Perry", "katy perry"], explanation: "Katy Perry est la chanteuse de ce succès pop soul et trap.", source: "Singles 2013" },
  { id: "pop-018", genre: "pop", difficulty: "difficile", artist: "Madonna", title: "Like It or Not", prompt: "Quel artiste a sorti 'Like It or Not' ?", acceptedAnswers: ["Madonna", "madonna"], explanation: "Madonna a intégré un son plus électronique et très marqué sur cette période.", source: "Singles / catalogue 2005" },
  { id: "pop-019", genre: "pop", difficulty: "difficile", artist: "Justin Bieber", title: "Peaches", prompt: "Qui interprète 'Peaches' ?", acceptedAnswers: ["Justin Bieber", "justin bieber"], explanation: "'Peaches' est une chanson de Justin Bieber très associée au son pop-funk.", source: "Singles 2021" },
  { id: "pop-020", genre: "pop", difficulty: "difficile", artist: "Ed Sheeran", title: "Shape of You", prompt: "Quel artiste a sorti 'Shape of You' ?", acceptedAnswers: ["Ed Sheeran", "ed sheeran"], explanation: "Ed Sheeran a produit l'un des plus grands tubes mondiaux de la décennie.", source: "Singles 2017" },
  { id: "pop-021", genre: "pop", difficulty: "difficile", artist: "Beyoncé", title: "Texas Hold 'Em", prompt: "Qui chante 'Texas Hold 'Em' ?", acceptedAnswers: ["Beyoncé", "beyonce"], explanation: "Beyoncé a intégré ce titre très pop-country dans son univers.", source: "Singles 2024" },
  { id: "pop-022", genre: "pop", difficulty: "difficile", artist: "Sabrina Carpenter", title: "Bed Chem", prompt: "Qui interprète 'Bed Chem' ?", acceptedAnswers: ["Sabrina Carpenter", "sabrina carpenter"], explanation: "'Bed Chem' est un titre pop de Sabrina Carpenter qui a marqué les radios.", source: "Singles 2024" },
  { id: "pop-023", genre: "pop", difficulty: "difficile", artist: "Bruno Mars", title: "24K Magic", prompt: "Quel artiste a sorti '24K Magic' ?", acceptedAnswers: ["Bruno Mars", "bruno mars"], explanation: "Bruno Mars est derrière ce succès pop-funk incontournable.", source: "Album 24K Magic / 2016" },
  { id: "pop-024", genre: "pop", difficulty: "difficile", artist: "Sam Smith", title: "Unholy", prompt: "Qui chante 'Unholy' ?", acceptedAnswers: ["Sam Smith", "sam smith"], explanation: "'Unholy' est un tube de Sam Smith en collaboration avec Kim Petras.", source: "Singles 2022" },
  { id: "pop-025", genre: "pop", difficulty: "difficile", artist: "Doja Cat", title: "Paint the Town Red", prompt: "Qui interprète 'Paint the Town Red' ?", acceptedAnswers: ["Doja Cat", "doja cat"], explanation: "Doja Cat a porté ce titre à un grand niveau de diffusion mondiale.", source: "Singles 2023" },
  { id: "rnb-001", genre: "rnb", difficulty: "facile", artist: "SZA", title: "Snooze", prompt: "Qui chante 'Snooze' ?", acceptedAnswers: ["SZA", "sza"], explanation: "SZA est l'interprète du titre très populaire 'Snooze'.", source: "Singles 2023" },
  { id: "rnb-002", genre: "rnb", difficulty: "facile", artist: "Beyoncé", title: "Cuff It", prompt: "Qui est l'artiste de 'Cuff It' ?", acceptedAnswers: ["Beyoncé", "beyonce"], explanation: "Beyoncé interprète ce morceau de R&B pop très écouté.", source: "Album Renaissance / 2022" },
  { id: "rnb-003", genre: "rnb", difficulty: "facile", artist: "Victoria Monét", title: "On My Mama", prompt: "Qui a sorti le morceau 'On My Mama' ?", acceptedAnswers: ["Victoria Monét", "victoria monet"], explanation: "Victoria Monét est l'artiste principale de ce morceau R&B récent.", source: "Singles 2023" },
  { id: "rnb-004", genre: "rnb", difficulty: "facile", artist: "SZA", title: "Kill Bill", prompt: "Qui chante 'Kill Bill' ?", acceptedAnswers: ["SZA", "sza"], explanation: "'Kill Bill' est l'un des plus grands succès de SZA dans le R&B contemporain.", source: "Singles 2022" },
  { id: "rnb-005", genre: "rnb", difficulty: "facile", artist: "Troye Sivan", title: "Rush", prompt: "Quel artiste est derrière 'Rush' ?", acceptedAnswers: ["Troye Sivan", "troye sivan"], explanation: "Troye Sivan est la voix centrale du morceau 'Rush'.", source: "Singles 2023" },
  { id: "rnb-006", genre: "rnb", difficulty: "facile", artist: "Muni Long", title: "Made for Me", prompt: "Qui est l'artiste du titre 'Made for Me' ?", acceptedAnswers: ["Muni Long", "muni long"], explanation: "Muni Long a livré ce morceau très apprécié dans le R&B actuel.", source: "Singles récents" },
  { id: "rnb-007", genre: "rnb", difficulty: "facile", artist: "Summer Walker", title: "Girls Need Love", prompt: "Qui interprète 'Girls Need Love' ?", acceptedAnswers: ["Summer Walker", "summer walker"], explanation: "Summer Walker a popularisé ce morceau en R&B.", source: "Singles 2020" },
  { id: "rnb-008", genre: "rnb", difficulty: "facile", artist: "The Weeknd", title: "Save Your Tears", prompt: "Qui chante 'Save Your Tears' ?", acceptedAnswers: ["The Weeknd", "the weeknd"], explanation: "The Weeknd est l'artiste principal du titre devenu énorme.", source: "Singles 2020" },
  { id: "rnb-009", genre: "rnb", difficulty: "moyen", artist: "Usher", title: "DJ Got Us Fallin' in Love", prompt: "Qui est l'artiste de 'DJ Got Us Fallin' in Love' ?", acceptedAnswers: ["Usher", "usher"], explanation: "Usher a mis en avant ce morceau dans le R&B dance des années 2000.", source: "Singles 2004" },
  { id: "rnb-010", genre: "rnb", difficulty: "moyen", artist: "Bruno Mars", title: "That's What I Like", prompt: "Qui chante 'That's What I Like' ?", acceptedAnswers: ["Bruno Mars", "bruno mars"], explanation: "Bruno Mars a sorti ce tube très influent dans la pop-R&B.", source: "Album 24K Magic / 2016" },
  { id: "rnb-011", genre: "rnb", difficulty: "moyen", artist: "Alicia Keys", title: "No One", prompt: "Quelle artiste interprète 'No One' ?", acceptedAnswers: ["Alicia Keys", "alicia keys"], explanation: "Alicia Keys est la chanteuse de ce titre devenu emblématique.", source: "Singles 2007" },
  { id: "rnb-012", genre: "rnb", difficulty: "moyen", artist: "Chris Brown", title: "No Guidance", prompt: "Qui chante 'No Guidance' avec Drake ?", acceptedAnswers: ["Chris Brown", "chris brown"], explanation: "Chris Brown est l'artiste principal du morceau avec Drake.", source: "Singles 2019" },
  { id: "rnb-013", genre: "rnb", difficulty: "moyen", artist: "Giveon", title: "Heartbreak Anniversary", prompt: "Qui est derrière 'Heartbreak Anniversary' ?", acceptedAnswers: ["Giveon", "giveon"], explanation: "Giveon a marqué le R&B moderne avec ce morceau.", source: "Singles 2020" },
  { id: "rnb-014", genre: "rnb", difficulty: "moyen", artist: "H.E.R.", title: "Best Part", prompt: "Qui interprète 'Best Part' avec Daniel Caesar ?", acceptedAnswers: ["H.E.R.", "her"], explanation: "H.E.R. est connue pour cette collaboration très appréciée du R&B moderne.", source: "Singles 2018" },
  { id: "rnb-015", genre: "rnb", difficulty: "moyen", artist: "SZA", title: "Good Days", prompt: "Quel artiste a sorti 'Good Days' ?", acceptedAnswers: ["SZA", "sza"], explanation: "SZA a sorti ce titre très apprécié avant son gros succès plus tardif.", source: "Singles 2018" },
  { id: "rnb-016", genre: "rnb", difficulty: "moyen", artist: "Rihanna", title: "Needed Me", prompt: "Qui chante 'Needed Me' ?", acceptedAnswers: ["Rihanna", "rihanna"], explanation: "Rihanna a sorti ce morceau au centre de la scène R&B urbain.", source: "Singles 2016" },
  { id: "rnb-017", genre: "rnb", difficulty: "difficile", artist: "Summer Walker", title: "Come Thru", prompt: "Qui est l'artiste de 'Come Thru' ?", acceptedAnswers: ["Summer Walker", "summer walker"], explanation: "Summer Walker a popularisé ce titre avec un univers très soul et contemporain.", source: "Singles 2020" },
  { id: "rnb-018", genre: "rnb", difficulty: "difficile", artist: "Bryson Tiller", title: "Exchange", prompt: "Qui interprète 'Exchange' ?", acceptedAnswers: ["Bryson Tiller", "bryson tiller"], explanation: "Bryson Tiller est l'artiste principal du morceau très influent.", source: "Singles 2015" },
  { id: "rnb-019", genre: "rnb", difficulty: "difficile", artist: "Jhené Aiko", title: "Sativa", prompt: "Qui chante 'Sativa' ?", acceptedAnswers: ["Jhené Aiko", "jhene aiko"], explanation: "Jhené Aiko a sorti ce titre très reconnu dans le R&B alternatif.", source: "Singles / albums 2014" },
  { id: "rnb-020", genre: "rnb", difficulty: "difficile", artist: "Tory Lanez", title: "Say It", prompt: "Qui interprète 'Say It' ?", acceptedAnswers: ["Tory Lanez", "tory lanez"], explanation: "Tory Lanez est l'artiste derrière ce morceau très écouté.", source: "Singles 2019" },
  { id: "rnb-021", genre: "rnb", difficulty: "difficile", artist: "Ariana Grande", title: "Positions", prompt: "Qui chante 'Positions' ?", acceptedAnswers: ["Ariana Grande", "ariana grande"], explanation: "Ariana Grande a imposé 'Positions' comme un morceau phare pop-R&B.", source: "Singles 2020" },
  { id: "rnb-022", genre: "rnb", difficulty: "difficile", artist: "Miguel", title: "Sure Thing", prompt: "Quel artiste a sorti 'Sure Thing' ?", acceptedAnswers: ["Miguel", "miguel"], explanation: "Miguel est derrière ce titre très connu dans le R&B contemporain.", source: "Singles 2010" },
  { id: "rnb-023", genre: "rnb", difficulty: "difficile", artist: "Partynextdoor", title: "Come and See Me", prompt: "Qui chante 'Come and See Me' ?", acceptedAnswers: ["PARTYNEXTDOOR", "partynextdoor"], explanation: "Partynextdoor est l'interprète principal du morceau.", source: "Singles 2016" },
  { id: "rnb-024", genre: "rnb", difficulty: "difficile", artist: "SZA", title: "Open Arms", prompt: "Quel artiste est derrière 'Open Arms' ?", acceptedAnswers: ["SZA", "sza"], explanation: "SZA est également célèbre pour ce titre R&B très mélodique.", source: "Singles / catalogue" },
  { id: "rnb-025", genre: "rnb", difficulty: "difficile", artist: "Frank Ocean", title: "Thinkin Bout You", prompt: "Qui interprète 'Thinkin Bout You' ?", acceptedAnswers: ["Frank Ocean", "frank ocean"], explanation: "Frank Ocean est le chanteur de ce tube R&B très marqué par la sensibilité.", source: "Singles 2012" },
  { id: "kompa-001", genre: "kompa", difficulty: "facile", artist: "Mikaben", title: "C'est la vie", prompt: "Qui chante le titre 'C'est la vie' ?", acceptedAnswers: ["Mikaben", "mikaben"], explanation: "Mikaben est un des artistes majeurs du kompa haïtien et interprète ce morceau populaire.", source: "Scène kompa haïtienne / singles récents" },
  { id: "kompa-002", genre: "kompa", difficulty: "facile", artist: "Mikaben", title: "Mélodie", prompt: "Quel artiste est associé au morceau 'Mélodie' ?", acceptedAnswers: ["Mikaben", "mikaben"], explanation: "Mikaben est un pilier du kompa moderne et a popularisé plusieurs morceaux très connus.", source: "Scène kompa / albums" },
  { id: "kompa-003", genre: "kompa", difficulty: "facile", artist: "Mikaben", title: "Joujou", prompt: "Qui est connu pour les morceaux 'Joujou' et 'Mélodie' ?", acceptedAnswers: ["Mikaben", "mikaben"], explanation: "Mikaben a longtemps marqué la scène kompa par ses titres très dansants.", source: "Scène kompa haïtienne" },
  { id: "kompa-004", genre: "kompa", difficulty: "facile", artist: "T-Vice", title: "Caribbean Queen", prompt: "Quel artiste est associé à la chanson 'Caribbean Queen' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], explanation: "T-Vice est un acteur important de la scène kompa moderne haïtienne.", source: "Scène kompa / singles" },
  { id: "kompa-005", genre: "kompa", difficulty: "facile", artist: "T-Vice", title: "Rêve", prompt: "Qui interprète 'Rêve' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], explanation: "T-Vice est connu pour de nombreux morceaux dansants et des thèmes très présents sur les scènes compètes.", source: "Scène kompa haïtienne" },
  { id: "kompa-006", genre: "kompa", difficulty: "facile", artist: "Carimi", title: "Mélodie", prompt: "Quel artiste est lié au titre 'Mélodie' dans la scène kompa francophone ?", acceptedAnswers: ["Carimi", "carimi"], explanation: "Carimi est l'un des noms très connus de la musique kompa haïtienne.", source: "Scène kompa / artistes emblématiques" },
  { id: "kompa-007", genre: "kompa", difficulty: "moyen", artist: "Mikaben", title: "Pa gen", prompt: "Qui est l'artiste derrière 'Pa gen' ?", acceptedAnswers: ["Mikaben", "mikaben"], explanation: "Mikaben est régulièrement associé à des titres très populaires en kompa.", source: "Festivals / singles haïtiens" },
  { id: "kompa-008", genre: "kompa", difficulty: "moyen", artist: "T-Vice", title: "Vibe", prompt: "Quel artiste est connu pour le morceau 'Vibe' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], explanation: "T-Vice a marqué le kompa moderne par sa présence scénique et son univers dansant.", source: "Scène kompa / variations" },
  { id: "kompa-009", genre: "kompa", difficulty: "moyen", artist: "Malandra", title: "Kombit", prompt: "Quel artiste est associé à 'Kombit' ?", acceptedAnswers: ["Malandra", "malandra"], explanation: "Malandra est un artiste de la scène kompa très apprécié des publics caribéens.", source: "Scène kompa / catalogue" },
  { id: "kompa-010", genre: "kompa", difficulty: "moyen", artist: "Mikaben", title: "Toujou", prompt: "Qui interprète le titre 'Toujou' ?", acceptedAnswers: ["Mikaben", "mikaben"], explanation: "Mikaben a des titres très reconnus dans le kompa contemporain qui restent populaires.", source: "Singles / scène haïtienne" },
  { id: "kompa-011", genre: "kompa", difficulty: "moyen", artist: "Carimi", title: "La vie", prompt: "Quel artiste chante 'La vie' ?", acceptedAnswers: ["Carimi", "carimi"], explanation: "Carimi fait partie des figures marquantes du kompa haïtien.", source: "Scène haïtienne / titres emblématiques" },
  { id: "kompa-012", genre: "kompa", difficulty: "moyen", artist: "T-Vice", title: "Pape", prompt: "Qui est à l'origine de la chanson 'Pape' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], explanation: "T-Vice est souvent associé à des morceaux très festifs et dansants.", source: "Album / sorties kompa" },
  { id: "kompa-013", genre: "kompa", difficulty: "moyen", artist: "T-Vice", title: "Madan", prompt: "Quel chanteur populaire est derrière 'Madan' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], explanation: "T-Vice est un nom incontournable dans le kompa moderne haïtien.", source: "Singles / culture musicale" },
  { id: "kompa-014", genre: "kompa", difficulty: "moyen", artist: "Mikaben", title: "Resto", prompt: "Qui chante 'Resto' ?", acceptedAnswers: ["Mikaben", "mikaben"], explanation: "Mikaben est un grand nom du kompa avec plusieurs morceaux très diffusés.", source: "Scène kompa / titres récents" },
  { id: "kompa-015", genre: "kompa", difficulty: "difficile", artist: "Mikaben", title: "Sainte Marie", prompt: "Quel artiste est derrière 'Sainte Marie' ?", acceptedAnswers: ["Mikaben", "mikaben"], explanation: "Mikaben a contribué à faire rayonner la musique kompa au-delà des frontières.", source: "Scène haïtienne / albums" },
  { id: "kompa-016", genre: "kompa", difficulty: "difficile", artist: "T-Vice", title: "L'amour", prompt: "Qui interprète 'L'amour' dans la scène kompa haïtienne ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], explanation: "T-Vice est connu pour sa capacité à mélanger groove et énergie de scène.", source: "Singles kompa / audience" },
  { id: "kompa-017", genre: "kompa", difficulty: "difficile", artist: "Carimi", title: "Danse", prompt: "Quel artiste est associé au titre 'Danse' ?", acceptedAnswers: ["Carimi", "carimi"], explanation: "Carimi est un artiste très connu de la musique kompa haïtienne.", source: "Scène kompa / catalogue" },
  { id: "kompa-018", genre: "kompa", difficulty: "difficile", artist: "Mikaben", title: "Mélodie 2", prompt: "Qui est derrière 'Mélodie 2' ?", acceptedAnswers: ["Mikaben", "mikaben"], explanation: "Mikaben est un artiste central dans le kompa moderne et ses titres sont largement diffusés.", source: "Singles / médias haïtiens" },
  { id: "kompa-019", genre: "kompa", difficulty: "difficile", artist: "T-Vice", title: "Légende", prompt: "Quel artiste est connu pour le morceau 'Légende' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], explanation: "T-Vice a construit sa réputation sur une musique festive et très accessible.", source: "Scène kompa / diffusion" },
  { id: "kompa-020", genre: "kompa", difficulty: "difficile", artist: "Mikaben", title: "Soleil", prompt: "Qui interprète 'Soleil' ?", acceptedAnswers: ["Mikaben", "mikaben"], explanation: "Mikaben est un grand nom du kompa haïtien et a des titres fortement identifiés.", source: "Catalogues / hit-parades haïtiens" }
];

const difficultyConfig = {
  facile: { label: "Facile", totalQuestions: 10, maxHints: 2 },
  moyen: { label: "Moyen", totalQuestions: 10, maxHints: 3 },
  difficile: { label: "Difficile", totalQuestions: 10, maxHints: 4 }
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
  skipPending: false
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

function updateDifficultyStats() {
  const config = difficultyConfig[state.selectedDifficulty];
  const availableQuestions = getQuestionsForSelectedGenre();
  const totalQuestions = Math.min(config.totalQuestions, availableQuestions.length || config.totalQuestions);
  document.getElementById("totalQuestionsValue").textContent = String(totalQuestions);
  document.getElementById("hintCountValue").textContent = String(config.maxHints);
  document.getElementById("difficultyValue").textContent = config.label;
}

function getQuestionsForSelectedGenre() {
  if (state.selectedGenre === "tous") {
    return quizQuestions.filter((question) => question.difficulty === state.selectedDifficulty);
  }

  return quizQuestions.filter(
    (question) => question.genre === state.selectedGenre && question.difficulty === state.selectedDifficulty
  );
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
  const pool = shuffle(availableQuestions);
  const selected = [];
  let lastArtist = null;

  for (const question of pool) {
    if (selected.length >= maxCount) {
      break;
    }

    const artist = question.artist ? normalize(question.artist) : "";
    if (lastArtist && artist && artist === lastArtist) {
      continue;
    }

    selected.push(question);
    lastArtist = artist || lastArtist;
  }

  if (selected.length < maxCount) {
    const fallback = shuffle(pool.filter((question) => !selected.includes(question)));
    for (const question of fallback) {
      if (selected.length >= maxCount) {
        break;
      }
      selected.push(question);
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
  state.score = 0;
  state.round = 0;
  state.questions = buildRoundQuestions(availableQuestions, Math.min(config.totalQuestions, availableQuestions.length));
  state.locked = false;
  state.skipPending = false;

  startScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  restartBtn.classList.remove("hidden");
  skipBtn.disabled = false;

  showRound();
}

function showRound() {
  const question = state.questions[state.round];
  state.currentQuestion = question;
  state.currentHintIndex = 0;
  state.locked = false;
  state.skipPending = false;
  skipBtn.disabled = false;

  scoreBadge.textContent = `Score : ${state.score}`;
  roundBadge.textContent = `Question ${state.round + 1} / ${state.questions.length}`;
  clueText.textContent = question.prompt;
  answerInput.value = "";
  answerInput.disabled = false;
  answerInput.focus();
  setFeedback("");
}

function revealNextHint() {
  const { hints } = state.currentQuestion;
  state.currentHintIndex += 1;
  clueText.textContent = hints[state.currentHintIndex];

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

  const maxScore = state.questions.length * 100;
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
  setFeedback("Question passée. On continue !", "error");

  setTimeout(() => {
    advanceRound();
  }, 400);
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
