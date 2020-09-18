[ <img src="https://media.discordapp.net/attachments/732211790804680814/756420126621958174/1200px-Flag_of_Russia.svg.png?width=651&height=434" wight="10px" height="10px"> Russian Guide ](https://github.com/perssBest/MongoDB-bot#ru-discord-bot-with-mongodb) / [ <img src="https://media.discordapp.net/attachments/732211790804680814/756420126814896178/the-united-states-flag-icon-free-download.jpg?width=825&height=434" wight="10px" height="10px"> English Guide ](https://github.com/perssBest/MongoDB-bot#en-discord-bot-with-mongodb)

<br><br>

<div align="center">
  <img src="https://media.discordapp.net/attachments/732211790804680814/756417495296114748/reminder_1.png?width=868&height=434" />
  <br>
</div>

<hr>

# [ru] Discord бот с использованием Mongodb

- Хеллоу! Вот и очередной туториал, в котором вы научитесь пользоваться базой данных mongodb.

- Для начало давайте скачаем проект(это можно сделать нажав на [меня *ня ;3*](https://github.com/perssBest/MongoDB-bot/archive/master.zip))

- Далее нам надо создать сервер. Это самый долгий этап. Так что заваривайте чаек и садитесь за компьютер :3

- Если у вас возникли какие-либо вопросы/проблемы заходите на наш Discord Server --> https://discord.gg/RPb2KXN

- Заходи на офф. сайт монгоДБ. [Регистрируемся](https://account.mongodb.com/account/register) или [Входим](https://account.mongodb.com/account/login) в аккаунт.

- После регистрации, вас перекинет на другую страничку. Вам необходимо нажать на зеленую кнопку, после в открывщимся окне написать название вашего проекта(не важно что вы напишете, это не будет влиять на работу.) Нажимаем на зеленую кнопку. Примеры:

![](https://cdn.discordapp.com/attachments/667072123914813444/686353659650768939/IMG_20200309_035249.png)

![](https://cdn.discordapp.com/attachments/667072123914813444/686353659331870865/IMG_20200309_035651.png)

- После, вас попросит ввести **Add Members and Set Permissions**. На данном этапе можете просто простустить, наваж на зеленую кнопку(это нее играет никакой роли.)

![](https://cdn.discordapp.com/attachments/667072123914813444/686353658962640904/IMG_20200309_035747.png)

- И так, мы создали наш проект, теперь давайте создадим "кластер". Нажимаем на кнопку **Build a Cluster**, далее в открывшимся окне просто нажимаем зеленую кнопку **Create cluster**(Так же по своему желанию можете сменить название кластера, по умолчанию он "Cluster0").

![](https://cdn.discordapp.com/attachments/667072123914813444/686353658648199200/IMG_20200309_035819.png)

![](https://cdn.discordapp.com/attachments/667072123914813444/686353658299809807/IMG_20200309_035851.png)

- После того как вы нажали на кнопку **Create cluster**. Вам стоит подождать 1-3 минут.

![](https://cdn.discordapp.com/attachments/667072123914813444/686353627912208447/IMG_20200309_035925.png)

- После того как наш кластер создался, вы увидете данную картину:

![](https://cdn.discordapp.com/attachments/667072123914813444/686353627736178702/IMG_20200309_040013.png)

- Окей! Пол дела сделано. Далее переходим во вкладку **Database Access**. Скриншот:

![](https://cdn.discordapp.com/attachments/667072123914813444/686353627509817527/IMG_20200309_040207.png)

- После перехода в данную вкладку, мы видем зеленую кнопку, с надписью **ADD NEW USER**, в открывшимся окне выставляем права "Atlas Admin". После пишите ваше имя и желаемый пароль(стоит понимать что, через эти данные вы будете входить в базу-данных. Так что запишите ваш пароль на листок или блокнот.) Сохранияем! Скриншот:

![](https://cdn.discordapp.com/attachments/667072123914813444/686353627320680467/IMG_20200309_040424.png)

- Теперь. Идем во вкладку **Network Access**.

![](https://cdn.discordapp.com/attachments/667072123914813444/686353626209452081/IMG_20200309_042002.png)

- Видим зеленую кнопку с надписью ***ADD IP ADDRESS***, тыкаем. В открывшимся окне, в строке "**Whitelist Entry**", пишем значение ***0.0.0.0/0***. Коментарий не обязателен. Сохраняем.

![](https://cdn.discordapp.com/attachments/667072123914813444/686353627106902047/IMG_20200309_040548.png)

<br><br><br><br>

- [🎉] Поздравляю! Мы создали базу, теперь нам необходима ссылка чтоб подкючиться к базе. Для этого опять идем во вкладку **Clusters**

![](https://cdn.discordapp.com/attachments/667072123914813444/686353626029228097/IMG_20200309_042035.png)

- Видим наш недавно созданный кластер. Находим кнопку с надписью ***CONNECT***, жмякаем. У вас открывается окно, нажимаете второй раздел("Connect Your Application"). После вы увидете кнопку ***copy***(данную ссылку нельзя показывать людям. Если они узнают название и пароль от бд, то смогут управлять вашей базой-данных.). Копируем ссылку и вставляем в наш код. config.json --> dataURL

![](https://cdn.discordapp.com/attachments/667072123914813444/686353626758905877/IMG_20200309_041447.png)

- Так же вместо `<password>` пишем свой пароль который вы указали во вкладке **Database Access**, создавая нового юзера.


- Необходимые пакеты для работы бота:
```
- discord.js(основа)
- mongoose(база)
- ms(время)
- fs(чтение файлов)
```

- ***Установка пакетов:***
```bash
$ npm i

$ yarn add
```

- Далее просто запускаем бота командой: **node .**

- Если у вас возникли какие-либо вопросы/проблемы заходите на наш Discord Server --> https://discord.gg/RPb2KXN

## Будте добры поставьте ⭐️ на наш репозиторий!


<br>
<br>
<br>
<br>
<br>

<div align="center">
  <img src="https://media.discordapp.net/attachments/732211790804680814/756416506870628372/reminder.png?width=868&height=434" />
  <br>
</div>

<hr>

# [en] Discord Bot with MongoDB

- Hello! Here is another tutorial in which you will learn how to use the mongodb database.

- First, let's download the project (you can do this by clicking on [me *nya ;3*](https://github.com/perssBest/MongoDB-bot/archive/master.zip))

- Next, we need to create a server. This is the longest stage. So make some tea and sit down at the computer: 3

- If you have any questions/problems go to our Discord Server -> https://discord.gg/RPb2KXN

- Come on official MongoDB website. [Register](https://account.mongodb.com/account/register) or [Login](https://account.mongodb.com/account/login) into your account.

- After registration, you will be transferred to another page. You need to click on the green button, then write the name of your project in the window that opens (no matter what you write, this will not affect the work.) Click on the green button. Examples:

![](https://cdn.discordapp.com/attachments/667072123914813444/686353659650768939/IMG_20200309_035249.png)

![](https://cdn.discordapp.com/attachments/667072123914813444/686353659331870865/IMG_20200309_035651.png)

- После, вас попросит ввести **Add Members and Set Permissions**. На данном этапе можете просто простустить, наваж на зеленую кнопку(это нее играет никакой роли.)

![](https://cdn.discordapp.com/attachments/667072123914813444/686353658962640904/IMG_20200309_035747.png)

- And so, we have created our project, now let's create a "cluster". Click on the **Build a Cluster** button, then in the window that opens, simply click the green **Create cluster** button (You can also change the name of the cluster if you wish, by default it is "Cluster0")

![](https://cdn.discordapp.com/attachments/667072123914813444/686353658648199200/IMG_20200309_035819.png)

![](https://cdn.discordapp.com/attachments/667072123914813444/686353658299809807/IMG_20200309_035851.png)

- After you clicked on the **Create cluster** button. You should wait 1-3 minutes.

![](https://cdn.discordapp.com/attachments/667072123914813444/686353627912208447/IMG_20200309_035925.png)

- After our cluster has been created, you will see this picture:

![](https://cdn.discordapp.com/attachments/667072123914813444/686353627736178702/IMG_20200309_040013.png)

- Okay! The floor is done. Next, go to the **Database Access** tab. Screenshot:

![](https://cdn.discordapp.com/attachments/667072123914813444/686353627509817527/IMG_20200309_040207.png)

- After switching to this tab, we see a green button with the inscription **ADD NEW USER**, in the window that opens, set the rights "Atlas Admin". Then write your name and the desired password (it is worthwhile to understand that through these data you will enter the database. So write down your password on a piece of paper or notebook.) Save! Screenshot:

![](https://cdn.discordapp.com/attachments/667072123914813444/686353627320680467/IMG_20200309_040424.png)

- Now. Go to the **Network Access** tab.

![](https://cdn.discordapp.com/attachments/667072123914813444/686353626209452081/IMG_20200309_042002.png)

- We see a green button with the inscription ***ADD IP ADDRESS***, poke. In the window that opens, in the line "**Whitelist Entry**", write the value ***0.0.0.0/0***. A comment is optional. We save.

![](https://cdn.discordapp.com/attachments/667072123914813444/686353627106902047/IMG_20200309_040548.png)

<br><br><br><br>

- [🎉] Congratulations! We have created a base, now we need a link to connect to the base. To do this, again go to the **Clusters** tab

![](https://cdn.discordapp.com/attachments/667072123914813444/686353626029228097/IMG_20200309_042035.png)


- We see our newly created cluster. We find a button labeled ***CONNECT***, press it. A window opens, click the second section ("Connect Your Application"). After that you will see the ***copy*** button (this link cannot be shown to people. If they find out the name and password from the database, they will be able to manage your database.). Copy the link and paste it into our code. config.json -> dataURL

![](https://cdn.discordapp.com/attachments/667072123914813444/686353626758905877/IMG_20200309_041447.png)

- Also, instead of `<password>`, write your password that you specified in the **Database Access** tab, creating a new user.

Required packages for the bot to work:
```
- discord.js(base)
- mongoose(database)
- ms(time)
- fs(read files)
```

- ***Install packages:***
```bash
$ npm i

$ yarn add
```

- Then just start the bot with the command: **node .**

- If you have any questions / problems go to our Discord Server -> https://discord.gg/RPb2KXN

_Translation may not be correct, sorry :c_

## Please put ⭐️ on our repository!
