//TODO:
/**
 * * Important
 *  ! Deprecated do not use
 * TODO in orange
 * ? Op deze vraag heb ik geen antwoord
 *
 *
 * @param name
 * @param message
 * @param lid
 * @returns
 *
 *
 *
 * auto comment --> /**
 *
 *
 * snippet :  obs & sub
 *
 *
 *  json to interface CTRL-SHIFT-V
 *
 *
*/
/***************************************************************************************************
/ CRTL SHIFT B --> default build production
/***************************************************************************************************/

//// Dit is a strike through
/*

ALTER TABLE Lid DROP COLUMN BIC;
ALTER TABLE Lid DROP COLUMN ToernooiSpeler;
ALTER TABLE Lid DROP COLUMN Gemerkt;
ALTER TABLE Lid DROP COLUMN Korting;
ALTER TABLE Lid DROP COLUMN Geincasseerd;
ALTER TABLE Lid DROP COLUMN VrijwillgersRegelingIsVanToepassing;
ALTER TABLE Lid DROP COLUMN VrijwillgersVasteTaak;
ALTER TABLE Lid DROP COLUMN VrijwillgersAfgekocht;
ALTER TABLE Lid DROP COLUMN VrijwillgersToelichting;
ALTER TABLE Lid DROP COLUMN Extra1;
ALTER TABLE Lid DROP COLUMN Extra2;
ALTER TABLE Lid DROP COLUMN Extra3;
ALTER TABLE Lid DROP COLUMN Extra4;
ALTER TABLE Lid DROP COLUMN Extra5;
ALTER TABLE Lid DROP COLUMN ExtraB;
ALTER TABLE Lid DROP COLUMN ExtraC;
ALTER TABLE Lid DROP COLUMN ExtraD;
ALTER TABLE Lid DROP COLUMN ExtraE;
ALTER TABLE Lid DROP COLUMN ToegangsCode;
ALTER TABLE Lid DROP COLUMN Image;
ALTER TABLE Lid DROP COLUMN VrijwilligersKorting;
ALTER TABLE Lid DROP COLUMN Ouder2_Naam;
ALTER TABLE Lid DROP COLUMN Ouder2_Email1;
ALTER TABLE Lid DROP COLUMN Ouder2_Email2;
ALTER TABLE Lid DROP COLUMN Ouder2_Telefoon;
ALTER TABLE Lid CHANGE Ouder2_Mobiel Ouder1_Mobiel2 char(20);
ALTER TABLE Lid CHANGE ExtraA TrainingsGroepen varchar(50);
UPDATE Lid SET TrainingsGroepen='' WHERE TrainingsGroepen = '_ExtraA';


*/

// Tabel kopieeren   CREATE TABLE new_table AS SELECT * FROM original_table;    
