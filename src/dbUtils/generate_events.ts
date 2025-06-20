import { db } from "./sqlite.ts";
import { generateRandomPointsInPolygon } from "../helpers/geometry.ts";
import { AllGeoJSON } from "npm:@turf/turf@7.2.0";

const events = [
  {
    name: "Hikari",
    description: "Anime & Manga Festival",
    date: "2025-07-01",
    location: "Tokyo",
    type: "festival",
    maxParticipants: 5000,
    geometry: `{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              16.932137945675493,
              52.41523422954202
            ],
            [
              16.932496222643323,
              52.416067477695094
            ],
            [
              16.93237196890334,
              52.41615071509358
            ],
            [
              16.932412149497253,
              52.41621198260319
            ],
            [
              16.93258291702523,
              52.41633655961007
            ],
            [
              16.93264706902127,
              52.41655025377611
            ],
            [
              16.932717385061494,
              52.41666053423276
            ],
            [
              16.932623630341595,
              52.416758561073635
            ],
            [
              16.932580101364323,
              52.41694236081349
            ],
            [
              16.9317999281528,
              52.417122075373754
            ],
            [
              16.9316793863687,
              52.41688926318952
            ],
            [
              16.931585631648773,
              52.41679736330471
            ],
            [
              16.931488528544378,
              52.41681370107594
            ],
            [
              16.931421560887486,
              52.41646243765973
            ],
            [
              16.93093604533641,
              52.416072368397266
            ],
            [
              16.93099966461122,
              52.415966170990316
            ],
            [
              16.93091595503887,
              52.41595595968781
            ],
            [
              16.93084898738195,
              52.41591919897877
            ],
            [
              16.93080545840357,
              52.41587426918207
            ],
            [
              16.930782019723893,
              52.41581912800507
            ],
            [
              16.930664826323124,
              52.41587018465265
            ],
            [
              16.93050075556178,
              52.41575173313936
            ],
            [
              16.93093604533641,
              52.415531167404794
            ],
            [
              16.931344548048088,
              52.41537595381902
            ],
            [
              16.93170282501586,
              52.415286093072496
            ],
            [
              16.932137945675493,
              52.41523422954202
            ]
          ]
        ],
        "type": "Polygon"
      }
    }
  ]
}`,
    imageUrl: null,
  },
  {
    name: "Pyrkon",
    description: "Fantasy Convention",
    date: "2025-08-15",
    location: "Poznan",
    type: "convention",
    maxParticipants: 10000,
    geometry: `{
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "coordinates": [
                    [
                      [
                        16.91166646736832,
                        52.406251105627774
                      ],
                      [
                        16.911284511852358,
                        52.40629541454982
                      ],
                      [
                        16.911262210246036,
                        52.40620303722531
                      ],
                      [
                        16.911167532890914,
                        52.40621208603926
                      ],
                      [
                        16.911187324871378,
                        52.4062628679159
                      ],
                      [
                        16.909326047241308,
                        52.406489442111535
                      ],
                      [
                        16.909297478565918,
                        52.40639896397346
                      ],
                      [
                        16.908985662836017,
                        52.40642474644392
                      ],
                      [
                        16.909004398959667,
                        52.406508699940616
                      ],
                      [
                        16.9087554267457,
                        52.40651775809417
                      ],
                      [
                        16.908721403603465,
                        52.406409282403615
                      ],
                      [
                        16.908613168114414,
                        52.40641928900402
                      ],
                      [
                        16.908522918685037,
                        52.40614213083671
                      ],
                      [
                        16.908377495574257,
                        52.40615077266307
                      ],
                      [
                        16.90756690814871,
                        52.40623967528148
                      ],
                      [
                        16.907633164240877,
                        52.406447880867034
                      ],
                      [
                        16.90700418927463,
                        52.40651025357249
                      ],
                      [
                        16.906986064271848,
                        52.40640541922107
                      ],
                      [
                        16.90678983658998,
                        52.405647670771685
                      ],
                      [
                        16.906311446850395,
                        52.40570560179924
                      ],
                      [
                        16.905739618446717,
                        52.40372048714289
                      ],
                      [
                        16.90406240139839,
                        52.40383001837981
                      ],
                      [
                        16.904025452459734,
                        52.40363558587083
                      ],
                      [
                        16.903962744241625,
                        52.403632442749426
                      ],
                      [
                        16.903875375819723,
                        52.40318334079166
                      ],
                      [
                        16.904151249815214,
                        52.40316123614264
                      ],
                      [
                        16.904089302114443,
                        52.40292776920475
                      ],
                      [
                        16.9038263075916,
                        52.40294559726502
                      ],
                      [
                        16.903740462747066,
                        52.40249223327001
                      ],
                      [
                        16.903688099736968,
                        52.40241193784914
                      ],
                      [
                        16.903819694359044,
                        52.401964690735554
                      ],
                      [
                        16.904158700978314,
                        52.40200272584002
                      ],
                      [
                        16.904405593588535,
                        52.40203304049052
                      ],
                      [
                        16.904377892954557,
                        52.4017058620301
                      ],
                      [
                        16.905507019206652,
                        52.40096895868058
                      ],
                      [
                        16.906426138936382,
                        52.40152268054817
                      ],
                      [
                        16.9069782675995,
                        52.40157743029769
                      ],
                      [
                        16.90738340282337,
                        52.40181401520147
                      ],
                      [
                        16.907495181857882,
                        52.40200987469996
                      ],
                      [
                        16.909322778608498,
                        52.403031569350645
                      ],
                      [
                        16.90919885228979,
                        52.40311026771576
                      ],
                      [
                        16.909370142365702,
                        52.40316685702689
                      ],
                      [
                        16.90991524991665,
                        52.40309010541279
                      ],
                      [
                        16.910311882152257,
                        52.40416353595617
                      ],
                      [
                        16.910723361459247,
                        52.404104487969676
                      ],
                      [
                        16.910767806045783,
                        52.40420398060073
                      ],
                      [
                        16.910808967011576,
                        52.40419676619851
                      ],
                      [
                        16.91091566650269,
                        52.40453689761162
                      ],
                      [
                        16.910870730561328,
                        52.40453988044791
                      ],
                      [
                        16.910884625128233,
                        52.40459398823231
                      ],
                      [
                        16.911100003828324,
                        52.404576354799644
                      ],
                      [
                        16.91166646736832,
                        52.406251105627774
                      ]
                    ]
                  ],
                  "type": "Polygon"
                }
              }
            ]
          }`,
    imageUrl: "/static/images/pyrkon.jpg",
  },
  {
    name: "Moricon",
    description: "Comics & Games",
    date: "2025-09-10",
    location: "Warsaw",
    type: "expo",
    maxParticipants: 3000,
    geometry: `
    {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              23.156198342578108,
              53.11927270393613
            ],
            [
              23.153097530573746,
              53.119552455939925
            ],
            [
              23.153389461836667,
              53.1190463145505
            ],
            [
              23.148995108145215,
              53.11952447102041
            ],
            [
              23.1488458988332,
              53.119750286172604
            ],
            [
              23.14550898407245,
              53.11904585936222
            ],
            [
              23.146005387965715,
              53.11821740691488
            ],
            [
              23.14660222521374,
              53.11834199851961
            ],
            [
              23.147140676812455,
              53.11755550782337
            ],
            [
              23.147199063064562,
              53.11746206244413
            ],
            [
              23.14730286084665,
              53.117493210926426
            ],
            [
              23.14738070918318,
              53.11733746828892
            ],
            [
              23.150397260491644,
              53.117962360618634
            ],
            [
              23.15090976204084,
              53.117035693729434
            ],
            [
              23.15142226359123,
              53.11716028875924
            ],
            [
              23.15144821303676,
              53.11710188488399
            ],
            [
              23.152058025006966,
              53.11722647972161
            ],
            [
              23.15202558820036,
              53.11730045773581
            ],
            [
              23.152622425448385,
              53.11743283912767
            ],
            [
              23.152765147399265,
              53.11747566831431
            ],
            [
              23.15281704629035,
              53.117405584168466
            ],
            [
              23.15307005338437,
              53.117456200507405
            ],
            [
              23.153581511829742,
              53.11794175080556
            ],
            [
              23.154087526018998,
              53.117700351995325
            ],
            [
              23.156198342578108,
              53.11927270393613
            ]
          ]
        ],
        "type": "Polygon"
      }
    }
  ]
}`,
    imageUrl: "/static/images/moricon.jpg",
  },
  {
    name: "Piwokon",
    description: "Board Games & Beer",
    date: "2025-10-05",
    location: "Krakow",
    type: "meetup",
    maxParticipants: 800,
    geometry: `{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              16.937903484880906,
              52.40819262572626
            ],
            [
              16.937397130845483,
              52.40822903655845
            ],
            [
              16.9373719747241,
              52.40807480875489
            ],
            [
              16.937880128381607,
              52.408041814677205
            ],
            [
              16.937903484880906,
              52.40819262572626
            ]
          ]
        ],
        "type": "Polygon"
      }
    }
  ]
}`,
    imageUrl: "/static/images/piwokon.png",
  },
];

// Insert events and collect their IDs
const eventIds: any[] = [];
for (const e of events) {
  db.query(
    `INSERT INTO events (name, description, date, location, type, maxParticipants, geometry, imageUrl)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      e.name,
      e.description,
      e.date,
      e.location,
      e.type,
      e.maxParticipants,
      e.geometry,
      e.imageUrl,
    ],
  );
  const id = Array.from(db.query("SELECT last_insert_rowid() as id"))[0]?.[0];
  if (id) eventIds.push(Number(id));
}

// Pool of quest templates
const questTemplates: any[] = [
  { name: "Odkryj 5 miejsc", type: "explore", metric: 5, description: "Odkryj 5 miejsc na terenie wydarzenia", xp: 100 },
  { name: "Kardio", type: "walk", metric: 5000, description: "Zrób 5km", xp: 150 },
  { name: "Znajdź Ananas", type: "walk_to", metric: "Zdjęcie", description: "Na środku znajduje się wielki ananas, zrób sobie z nim zdjęcie", xp: 200 },
  { name: "Quiz wiedzy", type: "walk_to", metric: "Odpowiedz na 10 pytań", description: "Weź udział w quizie wiedzy o wydarzeniu", xp: 120 },
  { name: "Selfie z Cosplayerem", type: "walk_to", metric: "Zdjęcie", description: "Zrób selfie z dowolnym cosplayerem", xp: 130 },
  { name: "Szlakiem Gwiezdnych Wojen", type: "walk_to", metric: "Odwiedź 5 lokacji", description: "Podążaj śladami Mocy i odwiedź wszystkie punkty", xp: 250 },
  { name: "Patrol Graniczny", type: "walk_to", metric: "Obejście terenu", description: "Odwiedź wszystkie punkty graniczne terenu wydarzenia", xp: 180 },
  { name: "Zbierz pieczątki", type: "explore", metric: 3, description: "Zbierz 3 pieczątki z różnych punktów", xp: 110 },
  { name: "Pokonaj trasę", type: "walk", metric: 2000, description: "Przejdź wyznaczoną trasę 2km", xp: 90 },
  { name: "Znajdź stoisko X", type: "walk_to", metric: "Stoisko X", description: "Odszukaj i odwiedź stoisko X", xp: 80 },
  { name: "Zagraj w grę planszową", type: "walk_to", metric: "Gra planszowa", description: "Zagraj w dowolną grę planszową na wydarzeniu", xp: 110 },
  { name: "Zrób 10 zdjęć", type: "walk", metric: 10, description: "Zrób 10 zdjęć na wydarzeniu", xp: 100 },
  { name: "Odwiedź 4 strefy", type: "explore", metric: 4, description: "Odwiedź 4 różne strefy tematyczne", xp: 140 },
  { name: "Rozwiąż zagadkę", type: "walk_to", metric: "Zagadka", description: "Rozwiąż zagadkę ukrytą na terenie wydarzenia", xp: 160 },
  { name: "Zbierz autografy", type: "walk", metric: 3, description: "Zbierz 3 autografy od prelegentów", xp: 170 },
  { name: "Wygraj konkurs", type: "walk_to", metric: "Konkurs", description: "Weź udział i wygraj konkurs na scenie", xp: 200 },
  { name: "Przebierz się", type: "walk_to", metric: "Strój", description: "Przebierz się w dowolny strój i pokaż się organizatorowi", xp: 120 },
];

function getRandomQuests(templates: typeof questTemplates, count: number) {
  const shuffled = templates.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Insert 5 random quests for each event
for (const eventId of eventIds) {
  const quests = getRandomQuests(questTemplates, 5);
  
  // Get the event's polygon for generating points
  const eventRow = Array.from(db.query("SELECT geometry FROM events WHERE id = ?", [eventId]))[0];
  const eventPolygon = JSON.parse(eventRow[0] as string) as AllGeoJSON;

  for (const q of quests) {
    let points = q.points;
    
    // Generate points within polygon for certain quest types
    if (eventRow) {
      if (q.type === "walk_to" && !q.points) {
        // Generate 1 random point for walk_to quests
        points = generateRandomPointsInPolygon(eventPolygon, 1);
      } else if (q.type === "explore") {
        // Generate 3-5 random points for explore quests
        const pointCount = Math.floor(Math.random() * 3) + 3; // 3-5 points
        points = generateRandomPointsInPolygon(eventPolygon, pointCount);
      }
    }
    
    db.query(
      `INSERT INTO quests (eventId, name, type, metric, description, xp, points)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [eventId, q.name, q.type, String(q.metric), q.description, q.xp, points ? JSON.stringify(points) : null],
    );
  }
}

console.log("Sample events and random quests inserted.");
