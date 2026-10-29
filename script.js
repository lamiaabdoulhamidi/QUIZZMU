const quizQuestions = [
  { id: "rap-001", genre: "rap", difficulty: "facile", artist: "Ninho", title: "M.L.C.", prompt: "Qui chante le titre 'M.L.C.' ?", acceptedAnswers: ["Ninho", "ninho"], hints: ["C'est un rappeur français", "Il a sorti plusieurs titres très populaires", "Il a des projets comme 'M.L.C.'"] },
  { id: "rap-002", genre: "rap", difficulty: "facile", artist: "Drake", title: "Laugh Now Cry Later", prompt: "Qui interprète 'Laugh Now Cry Later' ?", acceptedAnswers: ["Drake", "drake"], hints: ["C'est un rappeur canadien", "Il est très connu dans le monde du rap", "Il a collaboré avec de nombreux artistes"] },
  { id: "rap-003", genre: "rap", difficulty: "facile", artist: "Gazo", title: "Caméléon", prompt: "Qui est l'artiste de 'Caméléon' ?", acceptedAnswers: ["Gazo", "gazo"], hints: ["C'est un rappeur français", "Son style est très marqué et énergique", "Il est connu pour des morceaux de rap francophone"] },
  { id: "rap-004", genre: "rap", difficulty: "facile", artist: "Jazzy Bazz", title: "Mauvais garçon", prompt: "Qui chante 'Mauvais garçon' ?", acceptedAnswers: ["Jazzy Bazz", "jazzy bazz"], hints: ["C'est un rappeur de la scène française", "Son nom est composé d'un prénom et d'un nom de famille"] },
  { id: "rap-005", genre: "rap", difficulty: "moyen", artist: "Makala", title: "Mala", prompt: "Quel artiste est derrière 'Mala' ?", acceptedAnswers: ["Makala", "makala"], hints: ["C'est un artiste de rap français", "Le nom évoque souvent la musique underground et mélodique"] },
  { id: "rap-006", genre: "rap", difficulty: "moyen", artist: "Leto", title: "Paranoïa", prompt: "Qui interprète 'Paranoïa' ?", acceptedAnswers: ["Leto", "leto"], hints: ["C'est un rappeur français", "Son nom est très court et souvent utilisé dans les titres"] },
  { id: "rap-007", genre: "rap", difficulty: "moyen", artist: "Laylow", title: "Médaille", prompt: "Qui est l'artiste du morceau 'Médaille' ?", acceptedAnswers: ["Laylow", "laylow"], hints: ["C'est un rappeur français", "Il est connu pour ses morceaux très stylés et introspectifs"] },
  { id: "rap-008", genre: "rap", difficulty: "moyen", artist: "Damso", title: "Bande organisée", prompt: "Quel artiste a sorti 'Bande organisée' ?", acceptedAnswers: ["Damso", "damso"], hints: ["C'est un rappeur belge francophone", "Il est connu pour son univers sombre et intelligent"] },
  { id: "rap-009", genre: "rap", difficulty: "difficile", artist: "The Weeknd", title: "Starboy", prompt: "Qui chante 'Starboy' ?", acceptedAnswers: ["The Weeknd", "the weeknd", "weeknd"], hints: ["C'est un chanteur et rappeur canadien", "Il est connu pour des titres comme 'Blinding Lights'"] },
  { id: "rap-010", genre: "rap", difficulty: "difficile", artist: "Kaaris", title: "Pardonne-moi", prompt: "Quel rappeur est derrière 'Pardonne-moi' ?", acceptedAnswers: ["Kaaris", "kaaris"], hints: ["C'est un rappeur français", "Il est issu de la scène rap française underground"] },
  { id: "rap-011", genre: "rap", difficulty: "difficile", artist: "A$AP Rocky", title: "Praise the Lord", prompt: "Qui interprète 'Praise the Lord' avec Skepta ?", acceptedAnswers: ["A$AP Rocky", "a$ap rocky", "asap rocky"], hints: ["C'est un rappeur américain", "Son nom contient le signe dollar"] },
  { id: "rap-012", genre: "rap", difficulty: "difficile", artist: "Cardi B", title: "WAP", prompt: "Qui chante 'WAP' avec Megan Thee Stallion ?", acceptedAnswers: ["Cardi B", "cardi b"], hints: ["C'est une rappeuse américaine", "Elle est connue pour sa présence scénique et ses collaborations"] },
  { id: "rap-013", genre: "rap", difficulty: "facile", artist: "Jul et le collectif marseillais", title: "Bande organisée", prompt: "Qui interprète « Bande organisée » ?", choices: ["Jul et le collectif marseillais", "Ninho et Niska", "PNL", "Gazo et Tiakola"], correctAnswer: "Jul et le collectif marseillais", acceptedAnswers: ["Jul et le collectif marseillais", "jul et le collectif marseillais", "A"], hints: ["Le titre est porté par Jul et un collectif marseillais", "Ce groupe est connu pour son univers très marseillais"] },
  { id: "rap-014", genre: "rap", difficulty: "facile", artist: "Lartiste", title: "Chocolat", prompt: "Quel rappeur français interprète « Chocolat » avec Awa Imani ?", choices: ["Lartiste", "Kaaris", "Soprano", "Orelsan"], correctAnswer: "Lartiste", acceptedAnswers: ["Lartiste", "lartiste", "C"], hints: ["C'est un rappeur français connu pour ses titres pop-rap", "Son nom est souvent écrit en un seul mot"] },
  { id: "rap-015", genre: "rap", difficulty: "facile", artist: "Gims", title: "Sapés comme jamais", prompt: "Qui interprète « Sapés comme jamais » ?", choices: ["Gims", "Booba", "Ninho", "Orelsan"], correctAnswer: "Gims", acceptedAnswers: ["Gims", "gims", "A"], hints: ["C'est un rappeur français connu mondialement", "Il a aussi un nom de scène très reconnaissable"] },
  { id: "rap-016", genre: "rap", difficulty: "facile", artist: "Drake", title: "God's Plan", prompt: "Quel rappeur américain interprète « God’s Plan » ?", choices: ["Eminem", "Drake", "50 Cent", "Kendrick Lamar"], correctAnswer: "Drake", acceptedAnswers: ["Drake", "drake", "B"], hints: ["C'est un rappeur canadien", "Il est également très connu pour ses collaborations"] },
  { id: "rap-017", genre: "rap", difficulty: "facile", artist: "Aya Nakamura", title: "Djadja", prompt: "Quelle artiste interprète « Djadja » ?", choices: ["Aya Nakamura", "Shay", "Ronisia", "Lala &ce"], correctAnswer: "Aya Nakamura", acceptedAnswers: ["Aya Nakamura", "aya nakamura", "aya", "A"], hints: ["C'est une artiste franco-malienne", "Son nom est très présent sur les charts francophones"] },
  { id: "rap-018", genre: "rap", difficulty: "facile", artist: "Cardi B", title: "Bodak Yellow", prompt: "Qui est connue pour le son « Bodak Yellow » ?", choices: ["Beyoncé", "Rihanna", "Tyla", "Cardi B"], correctAnswer: "Cardi B", acceptedAnswers: ["Cardi B", "cardi b", "D"], hints: ["C'est une rappeuse américaine", "Elle est connue pour ses morceaux très marquants et énergétiques"] },
  { id: "rap-019", genre: "rap", difficulty: "facile", artist: "Jul", title: "Le J", prompt: "Quel rappeur français est surnommé « le J » ?", choices: ["Jul", "SCH", "Ninho", "SDM"], correctAnswer: "Jul", acceptedAnswers: ["Jul", "jul", "A"], hints: ["C'est un rappeur français très emblématique", "Son nom est un prénom simple et très connu"] },
  { id: "rap-020", genre: "rap", difficulty: "facile", artist: "Kendrick Lamar", title: "Not Like Us", prompt: "Qui chante « Not Like Us » ?", choices: ["Drake", "Kendrick Lamar", "Jay-Z", "Travis Scott"], correctAnswer: "Kendrick Lamar", acceptedAnswers: ["Kendrick Lamar", "kendrick lamar", "B"], hints: ["C'est un rappeur américain au style très influent", "Il a remporté de nombreux prix pour son travail"] },
  { id: "rap-021", genre: "rap", difficulty: "facile", artist: "PNL", title: "Au DD", prompt: "Quel duo français est connu pour les titres « Au DD » et « Deux frères » ?", choices: ["Bigflo & Oli", "PNL", "Djadja & Dinaz", "Casseurs Flowters"], correctAnswer: "PNL", acceptedAnswers: ["PNL", "pnl", "B"], hints: ["C'est un duo de rap français bien connu", "Leur nom est souvent mis en majuscules"] },
  { id: "rap-022", genre: "rap", difficulty: "facile", artist: "Nicki Minaj", title: "Pink Friday", prompt: "À quelle rappeuse appartient l’album « Pink Friday » ?", choices: ["Nicki Minaj", "Rihanna", "Megan Thee Stallion", "Cardi B"], correctAnswer: "Nicki Minaj", acceptedAnswers: ["Nicki Minaj", "nicki minaj", "A"], hints: ["C'est une rappeuse américaine", "Son album phare porte le nom d'une couleur et d'un mot très connu"] },
  { id: "rap-023", genre: "rap", difficulty: "moyen", artist: "Djadja & Dinaz", title: "On s'promet", prompt: "Quel est le nom du projet de Djadja & Dinaz sorti en 2016 ?", choices: ["On s’promet", "Dans l’arène", "Le revers de la médaille", "Drôle de mentalité"], correctAnswer: "On s’promet", acceptedAnswers: ["On s’promet", "on s'promet", "on s' promet", "A"], hints: ["Le titre est très proche d'un engagement mutuel", "Le projet est sorti en 2016"] },
  { id: "rap-024", genre: "rap", difficulty: "moyen", artist: "Damso", title: "Ipséité", prompt: "Quel rappeur français a sorti l’album « Ipséité » ?", choices: ["Ninho", "Damso", "SCH", "Niska"], correctAnswer: "Damso", acceptedAnswers: ["Damso", "damso", "B"], hints: ["C'est un rappeur belge francophone", "L'album porte un titre qui évoque la personnalité"] },
  { id: "rap-025", genre: "rap", difficulty: "moyen", artist: "Ninho", title: "Maman ne le sait pas", prompt: "Avec quel artiste Ninho interprète-t-il « Maman ne le sait pas » ?", choices: ["Niska", "Naza", "Dadju", "Koba LaD"], correctAnswer: "Dadju", acceptedAnswers: ["Dadju", "dadju", "C"], hints: ["C'est un artiste de la scène urbaine francophone", "Son prénom est très connu dans le rap français"] },
  { id: "rap-026", genre: "rap", difficulty: "moyen", artist: "PNL", title: "Le monde Chico", prompt: "Quel projet de PNL est sorti en 2015 ?", choices: ["Dans la légende", "Deux frères", "Le monde Chico", "Que la famille"], correctAnswer: "Le monde Chico", acceptedAnswers: ["Le monde Chico", "le monde chico", "C"], hints: ["Le projet est un album emblématique du duo", "Le titre contient un mot qui évoque le quotidien et le style de vie"] },
  { id: "rap-027", genre: "rap", difficulty: "moyen", artist: "Travis Scott", title: "Astroworld", prompt: "Quel rappeur américain a sorti l’album « Astroworld » ?", choices: ["Travis Scott", "Drake", "Future", "Kendrick Lamar"], correctAnswer: "Travis Scott", acceptedAnswers: ["Travis Scott", "travis scott", "A"], hints: ["C'est un rappeur américain à l'image très visuelle", "Son album porte un nom inspiré d'un thème emblématique de son univers"] },
  { id: "rap-028", genre: "rap", difficulty: "moyen", artist: "Rihanna", title: "Work", prompt: "Avec quel artiste Rihanna interprète-t-elle « Work » ?", choices: ["Drake", "Eminem", "Jay-Z", "A$AP Rocky"], correctAnswer: "Drake", acceptedAnswers: ["Drake", "drake", "A"], hints: ["C'est le rappeur canadien qui collabore avec de nombreux artistes", "Le titre est très connu dans les charts mondiaux"] },
  { id: "rap-029", genre: "rap", difficulty: "moyen", artist: "Naps", title: "La Kiffance", prompt: "Quel rappeur français interprète « La Kiffance » ?", choices: ["Gazo", "Naps", "SDM", "Soolking"], correctAnswer: "Naps", acceptedAnswers: ["Naps", "naps", "B"], hints: ["C'est un rappeur français à la réputation solide", "Son nom est court et très reconnaissable"] },
  { id: "rap-030", genre: "rap", difficulty: "moyen", artist: "Kendrick Lamar", title: "HUMBLE.", prompt: "Quel album de Kendrick Lamar contient le morceau « HUMBLE. » ?", choices: ["DAMN.", "To Pimp a Butterfly", "good kid, m.A.A.d city", "Mr. Morale & the Big Steppers"], correctAnswer: "DAMN.", acceptedAnswers: ["DAMN.", "damn", "A"], hints: ["Le titre de l'album est un acronyme très connu", "Il est sorti juste avant un autre projet très célébré du rappeur"] },
  { id: "rap-031", genre: "rap", difficulty: "moyen", artist: "SCH", title: "JVLIVS", prompt: "Quel rappeur français a sorti l’album « JVLIVS » ?", choices: ["Booba", "SCH", "Ninho", "Kaaris"], correctAnswer: "SCH", acceptedAnswers: ["SCH", "sch", "B"], hints: ["C'est un rappeur français connu pour son univers très mélodique", "Son nom est souvent utilisé en majuscules"] },
  { id: "rap-032", genre: "rap", difficulty: "moyen", artist: "Nicki Minaj", title: "Super Bass", prompt: "Quel artiste interprète « Super Bass » ?", choices: ["Cardi B", "Nicki Minaj", "Megan Thee Stallion", "Doja Cat"], correctAnswer: "Nicki Minaj", acceptedAnswers: ["Nicki Minaj", "nicki minaj", "B"], hints: ["C'est une rappeuse américaine emblématique", "Le titre est l'un des morceaux les plus connus de son album phare"] },
  { id: "rap-033", genre: "rap", difficulty: "difficile", artist: "Damso", title: "Batterie faible", prompt: "Quel est le premier album studio de Damso, sorti en 2016 ?", choices: ["Ipséité", "Batterie faible", "Lithopédion", "QALF"], correctAnswer: "Batterie faible", acceptedAnswers: ["Batterie faible", "batterie faible", "B"], hints: ["C'est son premier album studio", "Le titre est lié à une idée de fragilité ou de manque de puissance"] },
  { id: "rap-034", genre: "rap", difficulty: "difficile", artist: "Therapy", title: "P.N.L.", prompt: "Quel producteur est notamment associé à l’univers musical de PNL ?", choices: ["Therapy", "Seezy", "Kore", "Skread"], correctAnswer: "Therapy", acceptedAnswers: ["Therapy", "therapy", "A"], hints: ["C'est un producteur très lié à la scène rap française", "Son nom est aussi celui d'un thème musical important dans la production de PNL"] },
  { id: "rap-035", genre: "rap", difficulty: "difficile", artist: "Booba", title: "Kalash", prompt: "Sur quel album de Booba trouve-t-on « Kalash » avec Kaaris ?", choices: ["Futur", "Nero Nemesis", "Lunatic", "Trône"], correctAnswer: "Futur", acceptedAnswers: ["Futur", "futur", "A"], hints: ["L'album est sorti vers la fin de la carrière de Booba", "Le titre est associé à un projet très connu de l'artiste"] },
  { id: "rap-036", genre: "rap", difficulty: "difficile", artist: "Jay-Z", title: "4:44", prompt: "Quel rappeur américain a sorti l’album « 4:44 » en 2017 ?", choices: ["Nas", "Jay-Z", "Kanye West", "J. Cole"], correctAnswer: "Jay-Z", acceptedAnswers: ["Jay-Z", "jay z", "jay-z", "B"], hints: ["C'est un rappeur légendaire à la fois en solo et en groupe", "L'album porte le nom d'un temps très précis"] },
  { id: "rap-037", genre: "rap", difficulty: "difficile", artist: "Kendrick Lamar", title: "Section.80", prompt: "Quel projet de Kendrick Lamar est sorti en 2011 ?", choices: ["Section.80", "good kid, m.A.A.d city", "To Pimp a Butterfly", "DAMN."], correctAnswer: "Section.80", acceptedAnswers: ["Section.80", "section80", "section.80", "A"], hints: ["C'est son premier grand projet solo très connu", "Le titre commence par 'Section' et se termine par '80'"] },
  { id: "rap-038", genre: "rap", difficulty: "difficile", artist: "Kaaris", title: "Or Noir", prompt: "Quel rappeur français a sorti l’album « Or Noir » en 2013 ?", choices: ["Kaaris", "Lacrim", "Booba", "Rohff"], correctAnswer: "Kaaris", acceptedAnswers: ["Kaaris", "kaaris", "A"], hints: ["C'est un rappeur associé à une image très sombre et brutale", "Le titre de l'album évoque la couleur noire"] },
  { id: "rap-039", genre: "rap", difficulty: "difficile", artist: "Kanye West", title: "Graduation", prompt: "Quel artiste a sorti l’album « Graduation » ?", choices: ["Pharrell Williams", "Kanye West", "Tyler, The Creator", "Kid Cudi"], correctAnswer: "Kanye West", acceptedAnswers: ["Kanye West", "kanye west", "B"], hints: ["C'est un rappeur et producteur très influent", "Son album est très célèbre dans la culture rap"] },
  { id: "rap-040", genre: "rap", difficulty: "difficile", artist: "Ninho", title: "M.I.L.S 2.0", prompt: "Quel rappeur français a sorti le projet « M.I.L.S 2.0 » ?", choices: ["Niska", "Ninho", "Niro", "Gradur"], correctAnswer: "Ninho", acceptedAnswers: ["Ninho", "ninho", "B"], hints: ["C'est un rappeur français très influent dans la scène actuelle", "Le projet porte un titre très mémorisé dans sa discographie"] },
  { id: "rap-041", genre: "rap", difficulty: "difficile", artist: "Migos", title: "Migos", prompt: "Quel groupe d’Atlanta réunissait notamment Quavo, Offset et Takeoff ?", choices: ["Wu-Tang Clan", "Migos", "A$AP Mob", "Three 6 Mafia"], correctAnswer: "Migos", acceptedAnswers: ["Migos", "migos", "B"], hints: ["C'est un groupe de rap américain très connu", "Les trois rappeurs sont reconnus pour des collaborations très populaires"] },
  { id: "rap-042", genre: "rap", difficulty: "difficile", artist: "Nicki Minaj", title: "Pink Friday", prompt: "Sur quel album de Nicki Minaj trouve-t-on « Super Bass » ?", choices: ["Pink Friday", "The Pinkprint", "Queen", "Beam Me Up Scotty"], correctAnswer: "Pink Friday", acceptedAnswers: ["Pink Friday", "pink friday", "A"], hints: ["C'est son album de rupture très commercial", "Le nom de l'album est également un mot très évocateur dans la culture pop"] },
  { id: "pop-001", genre: "pop", difficulty: "facile", artist: "Aya Nakamura", title: "Djadja", prompt: "Qui chante 'Djadja' ?", acceptedAnswers: ["Aya Nakamura", "aya nakamura", "aya"], hints: ["C'est une artiste franco-malienne", "Son nom est souvent associé à des hits très populaires"] },
  { id: "pop-002", genre: "pop", difficulty: "facile", artist: "Sabrina Carpenter", title: "Espresso", prompt: "Qui interprète 'Espresso' ?", acceptedAnswers: ["Sabrina Carpenter", "sabrina carpenter"], hints: ["C'est une chanteuse américaine", "Le titre fait référence à une boisson très populaire"] },
  { id: "pop-003", genre: "pop", difficulty: "facile", artist: "Taylor Swift", title: "Fortnight", prompt: "Qui chante 'Fortnight' ?", acceptedAnswers: ["Taylor Swift", "taylor swift"], hints: ["C'est une chanteuse américaine", "Elle est connue pour de nombreux albums emblématiques"] },
  { id: "pop-004", genre: "pop", difficulty: "facile", artist: "Rosé", title: "Apt.", prompt: "Qui a sorti 'Apt.' ?", acceptedAnswers: ["Rosé", "rose", "rosé"], hints: ["C'est une chanteuse coréenne", "Elle a connu un énorme succès avec ce morceau"] },
  { id: "pop-005", genre: "pop", difficulty: "moyen", artist: "Billie Eilish", title: "Lunch", prompt: "Qui interprète 'Lunch' ?", acceptedAnswers: ["Billie Eilish", "billie eilish"], hints: ["C'est une artiste américaine", "Elle est reconnue pour son style très particulier et ses hits contemporains"] },
  { id: "pop-006", genre: "pop", difficulty: "moyen", artist: "Beyoncé", title: "Texas Hold 'Em", prompt: "Qui chante 'Texas Hold 'Em' ?", acceptedAnswers: ["Beyoncé", "beyonce"], hints: ["C'est une artiste américaine très connue", "Son nom commence par B et elle est emblématique de la pop"] },
  { id: "pop-007", genre: "pop", difficulty: "moyen", artist: "Olivia Rodrigo", title: "obsessed", prompt: "Qui est l'artiste de 'obsessed' ?", acceptedAnswers: ["Olivia Rodrigo", "olivia rodrigo"], hints: ["C'est une chanteuse américaine", "Elle est connue pour des titres pop très populaires"] },
  { id: "pop-008", genre: "pop", difficulty: "moyen", artist: "The Weeknd", title: "Blinding Lights", prompt: "Qui chante 'Blinding Lights' ?", acceptedAnswers: ["The Weeknd", "the weeknd", "weeknd"], hints: ["C'est un artiste canadien", "Il est aussi associé à des morceaux de rap et de R&B"] },
  { id: "pop-009", genre: "pop", difficulty: "difficile", artist: "Doja Cat", title: "Paint the Town Red", prompt: "Qui interprète 'Paint the Town Red' ?", acceptedAnswers: ["Doja Cat", "doja cat"], hints: ["C'est une artiste américaine", "Son nom est très présent dans la culture pop"] },
  { id: "pop-010", genre: "pop", difficulty: "difficile", artist: "Ariana Grande", title: "yes, and?", prompt: "Quel artiste chante 'yes, and?' ?", acceptedAnswers: ["Ariana Grande", "ariana grande"], hints: ["C'est une chanteuse américaine", "Elle est connue pour sa grande voix et ses success mondiaux"] },
  { id: "pop-011", genre: "pop", difficulty: "difficile", artist: "Lady Gaga", title: "Abracadabra", prompt: "Qui interprète 'Abracadabra' ?", acceptedAnswers: ["Lady Gaga", "lady gaga"], hints: ["C'est une artiste américaine emblématique", "Son nom est souvent associé à des performances très visuelles"] },
  { id: "pop-012", genre: "pop", difficulty: "difficile", artist: "Katy Perry", title: "Dark Horse", prompt: "Qui a sorti 'Dark Horse' ?", acceptedAnswers: ["Katy Perry", "katy perry"], hints: ["C'est une chanteuse américaine", "Elle a sorti de nombreux singles à succès"] },
  { id: "rnb-001", genre: "rnb", difficulty: "facile", artist: "SZA", title: "Snooze", prompt: "Qui chante 'Snooze' ?", acceptedAnswers: ["SZA", "sza"], hints: ["C'est une artiste de R&B", "Son nom est très court et stylé"] },
  { id: "rnb-002", genre: "rnb", difficulty: "facile", artist: "The Weeknd", title: "Save Your Tears", prompt: "Qui est le chanteur de 'Save Your Tears' ?", acceptedAnswers: ["The Weeknd", "the weeknd", "weeknd"], hints: ["C'est un artiste canadien", "Il est connu pour ses morceaux de R&B et de pop"] },
  { id: "rnb-003", genre: "rnb", difficulty: "facile", artist: "Victoria Monét", title: "On My Mama", prompt: "Qui interprète 'On My Mama' ?", acceptedAnswers: ["Victoria Monét", "victoria monét", "victoria monet"], hints: ["C'est une chanteuse américaine", "Son nom contient un accent sur le 'é'"] },
  { id: "rnb-004", genre: "rnb", difficulty: "facile", artist: "Summer Walker", title: "Girls Need Love", prompt: "Qui chante 'Girls Need Love' ?", acceptedAnswers: ["Summer Walker", "summer walker"], hints: ["C'est une artiste de R&B", "Son nom commence par 'Summer'"] },
  { id: "rnb-005", genre: "rnb", difficulty: "moyen", artist: "Usher", title: "DJ Got Us Fallin' in Love", prompt: "Qui chante 'DJ Got Us Fallin' in Love' ?", acceptedAnswers: ["Usher", "usher"], hints: ["C'est un chanteur américain", "Il est très célèbre dans la musique R&B"] },
  { id: "rnb-006", genre: "rnb", difficulty: "moyen", artist: "Giveon", title: "Heartbreak Anniversary", prompt: "Qui est derrière 'Heartbreak Anniversary' ?", acceptedAnswers: ["Giveon", "giveon"], hints: ["C'est un chanteur américain", "Son nom ressemble à une marque de mode ou une marque de musique"] },
  { id: "rnb-007", genre: "rnb", difficulty: "moyen", artist: "H.E.R.", title: "Best Part", prompt: "Qui chante 'Best Part' avec Daniel Caesar ?", acceptedAnswers: ["H.E.R.", "her"], hints: ["C'est une artiste de R&B", "Son nom est souvent stylisé avec des points"] },
  { id: "rnb-008", genre: "rnb", difficulty: "moyen", artist: "Miguel", title: "Sure Thing", prompt: "Quel artiste a sorti 'Sure Thing' ?", acceptedAnswers: ["Miguel", "miguel"], hints: ["C'est un chanteur américain", "Son nom est très court et très reconnaissable"] },
  { id: "rnb-009", genre: "rnb", difficulty: "difficile", artist: "Ariana Grande", title: "Positions", prompt: "Qui chante 'Positions' ?", acceptedAnswers: ["Ariana Grande", "ariana grande"], hints: ["C'est une chanteuse américaine", "Elle est surtout connue pour sa voix et ses performances"] },
  { id: "rnb-010", genre: "rnb", difficulty: "difficile", artist: "Bryson Tiller", title: "Exchange", prompt: "Qui interprète 'Exchange' ?", acceptedAnswers: ["Bryson Tiller", "bryson tiller"], hints: ["C'est un chanteur américain", "Son nom est composé de deux mots très connus dans la musique R&B"] },
  { id: "rnb-011", genre: "rnb", difficulty: "difficile", artist: "Frank Ocean", title: "Thinkin Bout You", prompt: "Qui a sorti 'Thinkin Bout You' ?", acceptedAnswers: ["Frank Ocean", "frank ocean"], hints: ["C'est un artiste de R&B très influent", "Son nom est associé à une sensibilité musicale particulière"] },
  { id: "rnb-012", genre: "rnb", difficulty: "difficile", artist: "PARTYNEXTDOOR", title: "Come and See Me", prompt: "Qui chante 'Come and See Me' ?", acceptedAnswers: ["PARTYNEXTDOOR", "partynextdoor"], hints: ["C'est un chanteur canadien"], },
  { id: "kompa-001", genre: "kompa", difficulty: "facile", artist: "Mikaben", title: "C'est la vie", prompt: "Qui chante le titre 'C'est la vie' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un artiste de kompa", "Son nom est très présent dans le monde de la musique haïtienne"] },
  { id: "kompa-002", genre: "kompa", difficulty: "facile", artist: "T-Vice", title: "Rêve", prompt: "Qui interprète 'Rêve' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], hints: ["C'est un artiste de kompa", "Son nom est souvent écrit avec un trait"] },
  { id: "kompa-003", genre: "kompa", difficulty: "facile", artist: "Carimi", title: "La vie", prompt: "Quel artiste chante 'La vie' ?", acceptedAnswers: ["Carimi", "carimi"], hints: ["C'est un artiste de kompa", "Le titre fait référence au quotidien et à la vie"] },
  { id: "kompa-004", genre: "kompa", difficulty: "facile", artist: "Malandra", title: "Kombit", prompt: "Quel artiste est associé à 'Kombit' ?", acceptedAnswers: ["Malandra", "malandra"], hints: ["C'est un artiste très connu dans la scène kompa", "Son nom est souvent associé à des rythmes festifs"] },
  { id: "kompa-005", genre: "kompa", difficulty: "moyen", artist: "Mikaben", title: "Toujou", prompt: "Qui interprète le titre 'Toujou' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un artiste très connu en musique haïtienne", "Son nom est souvent mentionné dans le kompa"] },
  { id: "kompa-006", genre: "kompa", difficulty: "moyen", artist: "T-Vice", title: "Madan", prompt: "Quel artiste est derrière 'Madan' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], hints: ["C'est un artiste de kompa", "Son nom contient souvent un signe typographique"] },
  { id: "kompa-007", genre: "kompa", difficulty: "moyen", artist: "Mikaben", title: "Pa gen", prompt: "Qui chante 'Pa gen' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un artiste de kompa très connu", "Il a sorti de nombreux titres au fil des années"] },
  { id: "kompa-008", genre: "kompa", difficulty: "moyen", artist: "Carimi", title: "Danse", prompt: "Quel artiste est associé au titre 'Danse' ?", acceptedAnswers: ["Carimi", "carimi"], hints: ["C'est un artiste de kompa", "Son nom est souvent porteur d'un univers musical festif"] },
  { id: "kompa-009", genre: "kompa", difficulty: "difficile", artist: "Mikaben", title: "Sainte Marie", prompt: "Quel artiste est derrière 'Sainte Marie' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un artiste de kompa très connu", "Son nom revient souvent dans les grands titres du genre"] },
  { id: "kompa-010", genre: "kompa", difficulty: "difficile", artist: "T-Vice", title: "L'amour", prompt: "Qui interprète 'L'amour' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], hints: ["C'est un artiste de kompa", "Son nom comporte souvent un trait d'union"] },
  { id: "kompa-011", genre: "kompa", difficulty: "difficile", artist: "Carimi", title: "Le cœur", prompt: "Quel artiste est lié au titre 'Le cœur' ?", acceptedAnswers: ["Carimi", "carimi"], hints: ["C'est un artiste de kompa", "Le titre est davantage lié à un sentiment humain"] },
  { id: "kompa-012", genre: "kompa", difficulty: "difficile", artist: "Mikaben", title: "Soleil", prompt: "Qui chante 'Soleil' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un artiste de kompa", "Son univers musical est extrêmement populaire en Haïti"] },
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
const menuBtn = document.getElementById("menuBtn");
const menuFromEndBtn = document.getElementById("menuFromEndBtn");
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

function showMenu() {
  state.score = 0;
  state.round = 0;
  state.currentQuestion = null;
  state.currentHintIndex = 0;
  state.questions = [];
  state.locked = false;
  state.skipPending = false;

  if (answerInput) {
    answerInput.value = "";
    answerInput.disabled = true;
  }

  if (skipBtn) skipBtn.disabled = true;
  if (restartBtn) restartBtn.classList.add("hidden");
  if (menuBtn) menuBtn.classList.add("hidden");

  startScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  setFeedback("");
}

function showGame() {
  startScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  if (restartBtn) restartBtn.classList.remove("hidden");
  if (menuBtn) menuBtn.classList.remove("hidden");
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

  showGame();
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
  if (skipBtn) skipBtn.disabled = false;

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

  if (skipBtn) skipBtn.disabled = true;
  if (restartBtn) restartBtn.classList.add("hidden");
  if (menuBtn) menuBtn.classList.add("hidden");

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
    if (skipBtn) skipBtn.disabled = true;
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
  if (skipBtn) skipBtn.disabled = true;
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
  if (skipBtn) skipBtn.disabled = true;
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
menuBtn.addEventListener("click", showMenu);
menuFromEndBtn.addEventListener("click", showMenu);
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
  showMenu();
});
