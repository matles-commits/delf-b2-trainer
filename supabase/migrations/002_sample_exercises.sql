-- Sample exercises for DELF B2

-- Comprehension Ecrite Exercise 1
INSERT INTO public.exercises (skill, difficulty, title, title_uk, description, description_uk, content, max_score, estimated_time_minutes, tags) VALUES
(
    'comprehension_ecrite',
    'moyen',
    'Le télétravail: révolution ou illusion?',
    'Віддалена робота: революція чи ілюзія?',
    'Lisez le texte sur le télétravail et répondez aux questions.',
    'Прочитайте текст про віддалену роботу та дайте відповіді на питання.',
    '{
        "type": "comprehension_ecrite",
        "data": {
            "text": "Le télétravail s''est imposé comme une nouvelle norme dans le monde professionnel, accéléré par la crise sanitaire mondiale. Si cette pratique offre indéniablement une flexibilité appréciable aux salariés, elle soulève également des questions fondamentales sur l''organisation du travail et la cohésion sociale en entreprise.\n\nD''un côté, les avantages sont nombreux: réduction du temps de transport, meilleur équilibre vie professionnelle-vie personnelle, et gains de productivité pour certaines tâches nécessitant de la concentration. De nombreux employés témoignent d''une satisfaction accrue, notamment grâce à la possibilité de mieux gérer leur emploi du temps.\n\nCependant, les défis ne manquent pas. L''isolement social, la difficulté à déconnecter, et le flou entre vie privée et vie professionnelle constituent des risques réels pour la santé mentale des travailleurs. Les managers, quant à eux, doivent réinventer leurs méthodes de management pour maintenir la motivation et l''engagement des équipes à distance.\n\nLes entreprises qui réussissent cette transition sont celles qui adoptent un modèle hybride, combinant télétravail et présence au bureau, tout en investissant dans des outils de communication efficaces et en maintenant une culture d''entreprise forte. L''avenir du travail se dessine ainsi comme un équilibre subtil entre flexibilité individuelle et cohésion collective.",
            "questions": [
                {
                    "id": "q1",
                    "question": "Selon le texte, qu''est-ce qui a accéléré l''adoption du télétravail?",
                    "question_uk": "Згідно з текстом, що прискорило впровадження віддаленої роботи?",
                    "type": "multiple_choice",
                    "options": [
                        "Les progrès technologiques",
                        "La crise sanitaire mondiale",
                        "Les demandes des syndicats",
                        "La pression économique"
                    ],
                    "options_uk": [
                        "Технологічний прогрес",
                        "Світова пандемія",
                        "Вимоги профспілок",
                        "Економічний тиск"
                    ],
                    "correct_answer": "La crise sanitaire mondiale",
                    "points": 2,
                    "explanation": "Le texte mentionne explicitement que le télétravail a été ''accéléré par la crise sanitaire mondiale''.",
                    "explanation_uk": "У тексті чітко вказано, що віддалена робота була ''прискорена світовою пандемією''."
                },
                {
                    "id": "q2",
                    "question": "Quels sont les avantages du télétravail mentionnés dans le texte? (Plusieurs réponses possibles)",
                    "question_uk": "Які переваги віддаленої роботи згадуються в тексті? (Кілька відповідей можливо)",
                    "type": "multiple_choice",
                    "options": [
                        "Réduction du temps de transport",
                        "Augmentation du salaire",
                        "Meilleur équilibre vie professionnelle-vie personnelle",
                        "Gains de productivité"
                    ],
                    "options_uk": [
                        "Скорочення часу на дорогу",
                        "Збільшення зарплати",
                        "Краща рівновага між роботою та особистим життям",
                        "Підвищення продуктивності"
                    ],
                    "correct_answer": ["Réduction du temps de transport", "Meilleur équilibre vie professionnelle-vie personnelle", "Gains de productivité"],
                    "points": 3,
                    "explanation": "Le texte cite trois avantages spécifiques: la réduction du temps de transport, l''équilibre vie pro-vie perso, et les gains de productivité.",
                    "explanation_uk": "У тексті наведено три конкретні переваги: скорочення часу на дорогу, рівновагу між роботою та особистим життям, та підвищення продуктивності."
                },
                {
                    "id": "q3",
                    "question": "Quel est le principal défi du télétravail pour la santé mentale selon le texte?",
                    "question_uk": "Який основний виклик віддаленої роботи для психічного здоров''я згідно з текстом?",
                    "type": "open",
                    "correct_answer": "L''isolement social, la difficulté à déconnecter et le flou entre vie privée et professionnelle",
                    "points": 3,
                    "explanation": "Le texte identifie trois risques pour la santé mentale liés au télétravail.",
                    "explanation_uk": "У тексті визначено три ризики для психічного здоров''я, пов''язані з віддаленою роботою."
                },
                {
                    "id": "q4",
                    "question": "Vrai ou Faux: Le texte suggère que seul le télétravail complet est une solution viable.",
                    "question_uk": "Правда чи неправда: Текст стверджує, що лише повна віддалена робота є життєздатним рішенням.",
                    "type": "true_false",
                    "correct_answer": "Faux",
                    "points": 2,
                    "explanation": "Le texte recommande un modèle hybride combinant télétravail et présence au bureau.",
                    "explanation_uk": "Текст рекомендує гібридну модель, що поєднує віддалену роботу та присутність в офісі."
                }
            ]
        }
    }'::jsonb,
    10,
    30,
    ARRAY['travail', 'société', 'actualité']
);

-- Production Ecrite Exercise 1
INSERT INTO public.exercises (skill, difficulty, title, title_uk, description, description_uk, content, max_score, estimated_time_minutes, tags) VALUES
(
    'production_ecrite',
    'moyen',
    'Lettre formelle: Demande de stage',
    'Офіційний лист: Запит на стажування',
    'Rédigez une lettre formelle pour demander un stage dans une entreprise française.',
    'Напишіть офіційного листа з проханням про стажування у французькій компанії.',
    '{
        "type": "production_ecrite",
        "data": {
            "prompt": "Vous souhaitez effectuer un stage de 3 mois dans une entreprise française dans le domaine de votre choix. Rédigez une lettre formelle de motivation dans laquelle vous:\n- Vous présentez et expliquez votre parcours\n- Exposez vos motivations pour ce stage\n- Décrivez vos compétences et ce que vous pourriez apporter à l''entreprise\n- Demandez poliment un entretien\n\nVotre lettre doit respecter les codes de la correspondance formelle en français.",
            "prompt_uk": "Ви хочете пройти 3-місячне стажування у французькій компанії в обраній вами галузі. Напишіть офіційного мотиваційного листа, в якому ви:\n- Представтеся та поясніть свій шлях\n- Викладіть свою мотивацію для цього стажування\n- Опишіть свої навички та що ви могли б принести компанії\n- Ввічливо попросіть про співбесіду\n\nВаш лист повинен відповідати кодам офіційної кореспонденції французькою мовою.",
            "min_words": 200,
            "max_words": 250,
            "criteria": [
                {
                    "name": "Respect des conventions (salutations, formules de politesse)",
                    "name_uk": "Дотримання конвенцій (привітання, формули ввічливості)",
                    "description": "Usage approprié des formules de politesse et structure formelle",
                    "description_uk": "Відповідне використання формул ввічливості та офіційної структури",
                    "max_points": 5
                },
                {
                    "name": "Capacité à présenter des faits et à argumenter",
                    "name_uk": "Здатність представляти факти та аргументувати",
                    "description": "Clarté de l''argumentation et pertinence des informations",
                    "description_uk": "Чіткість аргументації та доречність інформації",
                    "max_points": 5
                },
                {
                    "name": "Richesse du vocabulaire",
                    "name_uk": "Багатство словникового запасу",
                    "description": "Variété et précision du vocabulaire utilisé",
                    "description_uk": "Різноманітність і точність використаної лексики",
                    "max_points": 5
                },
                {
                    "name": "Correction grammaticale",
                    "name_uk": "Граматична правильність",
                    "description": "Maîtrise de la grammaire et de la syntaxe",
                    "description_uk": "Володіння граматикою та синтаксисом",
                    "max_points": 5
                },
                {
                    "name": "Cohérence et cohésion",
                    "name_uk": "Послідовність та зв''язність",
                    "description": "Organisation logique et utilisation des connecteurs",
                    "description_uk": "Логічна організація та використання сполучних слів",
                    "max_points": 5
                }
            ]
        }
    }'::jsonb,
    25,
    45,
    ARRAY['lettre formelle', 'stage', 'motivation']
);

-- Production Ecrite Exercise 2
INSERT INTO public.exercises (skill, difficulty, title, title_uk, description, description_uk, content, max_score, estimated_time_minutes, tags) VALUES
(
    'production_ecrite',
    'difficile',
    'Essai argumentatif: L''intelligence artificielle',
    'Аргументативний есей: Штучний інтелект',
    'Rédigez un essai sur l''impact de l''intelligence artificielle sur la société.',
    'Напишіть есей про вплив штучного інтелекту на суспільство.',
    '{
        "type": "production_ecrite",
        "data": {
            "prompt": "De nos jours, l''intelligence artificielle se développe rapidement et transforme de nombreux aspects de notre vie quotidienne et professionnelle.\n\nRédigez un texte argumenté dans lequel vous:\n- Présentez différents domaines où l''IA a un impact\n- Discutez des avantages et des inconvénients de cette technologie\n- Donnez votre opinion personnelle sur la place que devrait avoir l''IA dans notre société\n- Proposez des recommandations pour un développement responsable de l''IA\n\nVotre texte doit être structuré avec une introduction, un développement et une conclusion.",
            "prompt_uk": "Сьогодні штучний інтелект швидко розвивається та трансформує багато аспектів нашого повсякденного та професійного життя.\n\nНапишіть аргументований текст, в якому ви:\n- Представите різні сфери, де ШІ має вплив\n- Обговорите переваги та недоліки цієї технології\n- Надасте свою особисту думку про місце, яке повинен займати ШІ в нашому суспільстві\n- Запропонуєте рекомендації щодо відповідального розвитку ШІ\n\nВаш текст повинен бути структурованим із вступом, основною частиною та висновком.",
            "min_words": 250,
            "max_words": 300,
            "criteria": [
                {
                    "name": "Respect de la consigne",
                    "name_uk": "Дотримання інструкції",
                    "description": "Tous les points demandés sont traités",
                    "description_uk": "Всі запитані пункти розглянуті",
                    "max_points": 5
                },
                {
                    "name": "Capacité à argumenter",
                    "name_uk": "Здатність аргументувати",
                    "description": "Arguments pertinents et bien développés",
                    "description_uk": "Доречні та добре розвинені аргументи",
                    "max_points": 6
                },
                {
                    "name": "Richesse et précision du vocabulaire",
                    "name_uk": "Багатство та точність словника",
                    "description": "Vocabulaire varié et approprié au sujet",
                    "description_uk": "Різноманітний словник, відповідний темі",
                    "max_points": 5
                },
                {
                    "name": "Correction grammaticale",
                    "name_uk": "Граматична правильність",
                    "description": "Peu d''erreurs grammaticales",
                    "description_uk": "Мало граматичних помилок",
                    "max_points": 5
                },
                {
                    "name": "Structure et cohérence",
                    "name_uk": "Структура та послідовність",
                    "description": "Texte bien organisé avec introduction, développement et conclusion",
                    "description_uk": "Добре організований текст із вступом, основною частиною та висновком",
                    "max_points": 4
                }
            ]
        }
    }'::jsonb,
    25,
    60,
    ARRAY['essai', 'technologie', 'argumentation']
);

-- Comprehension Ecrite Exercise 2
INSERT INTO public.exercises (skill, difficulty, title, title_uk, description, description_uk, content, max_score, estimated_time_minutes, tags) VALUES
(
    'comprehension_ecrite',
    'difficile',
    'Les enjeux du changement climatique',
    'Виклики зміни клімату',
    'Lisez l''article sur le changement climatique et répondez aux questions de compréhension.',
    'Прочитайте статтю про зміну клімату та дайте відповіді на питання на розуміння.',
    '{
        "type": "comprehension_ecrite",
        "data": {
            "text": "Le changement climatique représente l''un des défis les plus pressants de notre époque. Les scientifiques sont unanimes: l''activité humaine, notamment l''émission de gaz à effet de serre, est la principale responsable du réchauffement global observé depuis le milieu du XXe siècle.\n\nLes conséquences de ce phénomène se manifestent déjà de manière tangible à travers le monde. La fonte accélérée des glaciers et des calottes polaires contribue à l''élévation du niveau des mers, menaçant les zones côtières densément peuplées. Les événements météorologiques extrêmes - canicules, sécheresses, inondations - deviennent plus fréquents et plus intenses, affectant l''agriculture, la disponibilité en eau potable et la santé publique.\n\nFace à cette urgence, la transition énergétique s''impose comme une nécessité absolue. Il s''agit de remplacer progressivement les énergies fossiles par des sources d''énergie renouvelables comme le solaire, l''éolien ou l''hydroélectrique. Cette transformation nécessite des investissements massifs mais représente également une opportunité économique majeure, créant de nouveaux emplois et stimulant l''innovation technologique.\n\nCependant, la lutte contre le changement climatique ne peut se limiter à la seule dimension énergétique. Elle exige une transformation profonde de nos modes de vie et de consommation: réduction du gaspillage, promotion d''une agriculture durable, développement des transports en commun, et sensibilisation de la population aux enjeux environnementaux.\n\nLes accords internationaux, comme l''Accord de Paris de 2015, constituent des cadres essentiels pour coordonner l''action globale. Néanmoins, leur efficacité dépend de la volonté politique des États et de l''engagement de chaque citoyen. Le temps presse: chaque dixième de degré compte pour éviter les scénarios les plus catastrophiques.",
            "questions": [
                {
                    "id": "q1",
                    "question": "Selon le texte, quelle est la principale cause du changement climatique?",
                    "question_uk": "Згідно з текстом, яка основна причина зміни клімату?",
                    "type": "open",
                    "correct_answer": "L''activité humaine, notamment l''émission de gaz à effet de serre",
                    "points": 2,
                    "explanation": "Le texte indique clairement que l''activité humaine et les émissions de gaz à effet de serre sont responsables du réchauffement.",
                    "explanation_uk": "Текст чітко вказує, що людська діяльність та викиди парникових газів відповідальні за потепління."
                },
                {
                    "id": "q2",
                    "question": "Quelles sont les conséquences du changement climatique mentionnées? (plusieurs réponses)",
                    "question_uk": "Які наслідки зміни клімату згадуються? (кілька відповідей)",
                    "type": "multiple_choice",
                    "options": [
                        "Fonte des glaciers",
                        "Augmentation de la population",
                        "Élévation du niveau des mers",
                        "Événements météorologiques extrêmes plus fréquents",
                        "Baisse des températures"
                    ],
                    "options_uk": [
                        "Танення льодовиків",
                        "Збільшення населення",
                        "Підвищення рівня морів",
                        "Більш часті екстремальні погодні явища",
                        "Зниження температур"
                    ],
                    "correct_answer": ["Fonte des glaciers", "Élévation du niveau des mers", "Événements météorologiques extrêmes plus fréquents"],
                    "points": 3,
                    "explanation": "Le texte mentionne la fonte des glaciers, l''élévation du niveau des mers et l''augmentation des événements extrêmes.",
                    "explanation_uk": "Текст згадує танення льодовиків, підвищення рівня морів та збільшення екстремальних явищ."
                },
                {
                    "id": "q3",
                    "question": "Qu''est-ce que la transition énergétique selon le texte?",
                    "question_uk": "Що таке енергетичний перехід згідно з текстом?",
                    "type": "open",
                    "correct_answer": "Le remplacement progressif des énergies fossiles par des sources d''énergie renouvelables",
                    "points": 3,
                    "explanation": "La transition énergétique est définie comme le passage des énergies fossiles aux énergies renouvelables.",
                    "explanation_uk": "Енергетичний перехід визначається як перехід від викопного палива до відновлюваних джерел енергії."
                },
                {
                    "id": "q4",
                    "question": "Vrai ou Faux: Selon le texte, la lutte contre le changement climatique concerne uniquement l''énergie.",
                    "question_uk": "Правда чи неправда: Згідно з текстом, боротьба зі зміною клімату стосується лише енергетики.",
                    "type": "true_false",
                    "correct_answer": "Faux",
                    "points": 2,
                    "explanation": "Le texte précise que la lutte ne peut se limiter à la dimension énergétique et nécessite une transformation des modes de vie.",
                    "explanation_uk": "Текст зазначає, що боротьба не може обмежуватися енергетичною складовою та вимагає трансформації способу життя."
                }
            ]
        }
    }'::jsonb,
    10,
    35,
    ARRAY['environnement', 'climat', 'société']
);

-- Production Orale Exercise 1
INSERT INTO public.exercises (skill, difficulty, title, title_uk, description, description_uk, content, max_score, estimated_time_minutes, tags) VALUES
(
    'production_orale',
    'moyen',
    'Débat: Les réseaux sociaux',
    'Дебати: Соціальні мережі',
    'Préparez et présentez un point de vue argumenté sur l''impact des réseaux sociaux.',
    'Підготуйте та представте аргументовану точку зору про вплив соціальних мереж.',
    '{
        "type": "production_orale",
        "data": {
            "scenario": "Vous participez à un débat sur le thème: ''Les réseaux sociaux: progrès ou régression sociale?''. Vous devez présenter votre point de vue de manière claire et argumentée.",
            "scenario_uk": "Ви берете участь у дебатах на тему: ''Соціальні мережі: прогрес чи соціальна регресія?''. Ви повинні представити свою точку зору чітко та аргументовано.",
            "role": "Débatteur défendant une position nuancée",
            "role_uk": "Учасник дебатів, який захищає виважену позицію",
            "duration_minutes": 5,
            "preparation_minutes": 10,
            "key_points": [
                "Présentez 2-3 avantages des réseaux sociaux avec des exemples concrets",
                "Exposez 2-3 inconvénients ou risques avec des exemples",
                "Donnez votre opinion personnelle de manière nuancée",
                "Proposez des solutions pour un usage plus responsable",
                "Utilisez des connecteurs logiques pour structurer votre discours",
                "Employez un vocabulaire varié et précis"
            ],
            "key_points_uk": [
                "Представте 2-3 переваги соціальних мереж з конкретними прикладами",
                "Викладіть 2-3 недоліки або ризики з прикладами",
                "Дайте свою особисту думку виважено",
                "Запропонуйте рішення для більш відповідального використання",
                "Використовуйте логічні сполучники для структурування промови",
                "Вживайте різноманітну та точну лексику"
            ]
        }
    }'::jsonb,
    25,
    15,
    ARRAY['oral', 'débat', 'réseaux sociaux']
);
