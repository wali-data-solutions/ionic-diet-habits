CREATE TABLE state_text(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(255), description TEXT,type VARCHAR(16));

INSERT INTO state_text(name, description, type) VALUES ('Eat and enjoy for maximum satisfaction!', 'Eat and enjoy for maximum satisfaction!', 'Go');
INSERT INTO state_text(name, description, type) VALUES ('Eat and enjoy!', 'Eat and enjoy!', 'Go');
INSERT INTO state_text(name, description, type) VALUES ('Iss und hol dir den vollen Genuss ab!', 'Iss und hol dir den vollen Genuss ab!', 'Go');
INSERT INTO state_text(name, description, type) VALUES ('Iss und geniess es!', 'Iss und geniess es!', 'Go');

INSERT INTO state_text(name, description, type) VALUES ('I eat it anyway and enjoy it without any regret in order to fill up my satisfaction meter!', 'I eat it anyway and enjoy it without any regret in order to fill up my satisfaction meter!', 'Go anyway');
INSERT INTO state_text(name, description, type) VALUES ('Ich esse is trotzdem und uhne schuldgefühle und fülle dedurch meinen Satisfaction meter auf!', 'ich esse is trotzdem und uhne schuldgefühle und fülle dedurch meinen Satisfaction meter auf!', 'Go anyway');

INSERT INTO state_text(name, description, type) VALUES ('I forget about it and wait for more desire', 'I forget about it and wait for more desire', 'Wait');
INSERT INTO state_text(name, description, type) VALUES ('I do something else and wait in order to catch the whole amount enjoyment later', 'I do something else and wait in order to catch the whole amount enjoyment later', 'Wait');
INSERT INTO state_text(name, description, type) VALUES ('Ich lasse es sein und warte bis mein Verlangen grosser ist', 'ich lasse es sein und warte bis mein Verlangen grosser ist', 'Wait');
INSERT INTO state_text(name, description, type) VALUES ('Ich tue etwas anderes und warte bis ich den vollen Genuss später abholen kann', 'Ich tue etwas anderes und warte bis ich den vollen Genuss später abholen kann', 'Wait');


-- Statistics table.
--CREATE TABLE statistic(id INTEGER PRIMARY KEY AUTOINCREMENT, satisfactionExperience INTEGER NOT NULL, guiltExperience INTEGER NOT NULL, chosenState TEXT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP);

-- Tracking table.
CREATE TABLE tracking(id INTEGER PRIMARY KEY AUTOINCREMENT, satisfaction_experience INTEGER NOT NULL, guilt_experience INTEGER NOT NULL, chosen_state TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
-- Settings table.
CREATE TABLE setting(id INTEGER PRIMARY KEY AUTOINCREMENT, mylimit INTEGER NOT NULL, pause_time INTEGER NOT NULL, go_text TEXT, goanyway_text TEXT, wait_text TEXT, track TINYINT(1) NOT NULL DEFAULT 1);
INSERT INTO setting(mylimit, pause_time, go_text, goanyway_text, wait_text, track) VALUES (70, 15, 'Eat and enjoy for maximum satisfaction!', 'I eat it anyway and enjoy it without any regret in order to fill up my satisfaction meter!', 'I forget about it and wait for more desire', 1);
-- Statistics table.
CREATE TABLE statistic(id INTEGER PRIMARY KEY AUTOINCREMENT, go_count INTEGER NOT NULL, go_anyway_count INTEGER NOT NULL, wait_count INTEGER NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);