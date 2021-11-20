CREATE TABLE TitlePart
(
  Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  Title NVARCHAR(255) NOT null,
  ContentItemId INT NOT NULL
);

INSERT INTO TitlePart
VALUES
  ('Hello world', 999);

INSERT INTO TitlePart
VALUES
  ('Hello world', 555);

/****************************************/

CREATE TABLE MarkdownBodyPart
(
  Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  Markdown NVARCHAR(MAX) NOT null,
  ContentItemId INT NOT NULL
);

INSERT INTO MarkdownBodyPart
VALUES
  (
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra risus sit amet congue.',
    999
);

INSERT INTO MarkdownBodyPart
VALUES
  (
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra risus sit amet congue.',
    555
);

/****************************************/
