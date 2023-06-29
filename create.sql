create database DemoDayJudging; -- STEP 1: Run this line FIRST

use DemoDayJudging; --STEP 2: Run this line SECOND

--STEP 3: Run the remaining lines LAST
create table LOGIN (
username varchar(50) not null,
password varchar(50) not null,
admin varchar(10) not null,
judge varchar(10) not null
)

create table PARTICIPANT (
participantID int not null,
fName varchar(50) not null,
lName varchar(50) not null,
project varchar(50) not null
)

create table CREATIVITY (
participantID int not null,
createScore int not null
)

create table ORIGINALITY (
participantID int not null,
originScore int not null
)

create table LANGACCEPT (
participantID int not null,
langScore int not null
)

create table ATTRACTION (
participantID int not null,
attractScore int not null
)

create table LEGIBILITY (
participantID int not null,
legibilityScore int not null
)

create table PURPOSE (
participantID int not null,
purposeScore int not null
)

create table GRAPHICS (
participantID int not null,
graphicScore int not null
)

create table CONTENT (
participantID int not null,
contentScore int not null
)

create table DETAIL (
participantID int not null,
detailScore int not null
)

create table SPELLING (
participantID int not null,
spellScore int not null
)

create table TOTAL (
participantID int not null,
createScore int not null,
originScore int not null,
langScore int not null,
attractScore int not null,
legibilityScore int not null,
purposeScore int not null,
graphicScore int not null,
contentScore int not null,
detailScore int not null,
spellScore int not null,
totalScore int not null
)