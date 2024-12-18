import { format, parseISO } from "date-fns";
const frLocale = require('date-fns/locale/fr');

const l = {
    fr: {
        ADD: "Ajouter",
        FRIENDS: "Amis",
        HOME: "Accueil",
        NOTIFICATIONS: "Notifications",
        BOOKMARKS: "Favoris",
        CANCEL: "Annuler",
        ADD_CONTACT_PERSON: "Ajouter un contact",
        SEARCH: "Recherche",
        USER_ALREADY_EXISTS: "Cet utilisateur existe déja",
        CLOSE: "Fermer",
        FILTERS: "Filtres",
        JOIN: "Rejoindre",
        RESULTS: "Résultats",
        PLACE_FILTER_PLACEHOLDER: "Adresse, ville, pays, code postal...",
        FILTER_BY: "Filtrer par",
        DATE: "Date",
        DATES: "Dates",
        PLACE: "Lieu",
        NO_DATA: "Aucun résultat",
        OK: "Ok",
        ADDRESS: "Adresse",
        HOURS: "Heures",
        FROM: "de",
        TO: "à",
        DETAILS: "Détails",
        SEE_DETAILS: "Voir détails",
        BOOKMARK_THIS_PLACE: "Mettre en favori",
        UNBOOKMARK_THIS_PLACE: "Retirer des favoris",
        PARAMETERS: "Paramètres",
        MUTE: "Mettre en sourdine",
        PEOPLE_LIST: "Liste des membres",
        SHARED_CONTENT: "Contenu partagé",
        COPY_TEXT: "Copier le texte",
        EDIT_INFOS: "Modifier les informations",
        ATTACHMENT: "Pièce jointe",
        COPY_ATTACHMENT_LINK: "Copier le lien de la pièce jointe",
        SAVE_ATTACHMENT: "Sauvegarder la pièce jointe",
        SHARE_ATTACHMENT: "Partager la pièce jointe",
        COPY_TO_CLIPBOARD: "Copié dans le presse-papiers",
        NO_GRANTED_ACCESS: "Accès non accordé",
        PHONE_ACCESS_NOT_GRANTED_TO_MEDIA: "L'accès à la bibliothèque du téléphone n'est pas autorisé. Vous pouvez accorder l'accès dans les paramètres du téléphone",
        CAMERA: "Caméra",
        PHOTO_VIDEO_LIBRARY: "Bibliothèque photos/vidéos",
        PHOTO_LIBRARY: "Bibliothèque photos",
        FILE: "Fichier",
        SHARED_CONTENT: "Contenu partagé",
        NO_SHARED_CONTENT: "Aucun contenu partagé",
        EDITING: "Edition",
        START: "Début",
        END: "Fin",
        SPORT: "Sport",
        DESCRIPTION: "Description",
        NAME: "Nom",
        GENERAL: "Général",
        SAVE_CHANGES: "Sauvegarder les modifications",
        ROLES: "Rôles",
        NO_MEMBER: "Aucun membre",
        MEMBERS: "Membres",
        SEE_PROFILE: "Voir le profil",
        EXCLUDE: "Exclure",
        SURE_TO_EXCLUDE: "Etes vous sûr de vouloir exclure",
        MANAGE_ROLE: "Gestion du rôle",
        INVITE: "Inviter",
        WAITING: "En attente",
        success: {
            SUCCESS_DOWNLOAD_FILE: "Téléchargement terminé avec succès",
            EDIT_SUCCESS: "Modifié avec succès",
            CREATE_SUCCESS: "Créé avec succès",
            EDIT_PROFILE_SUCCESS: "Profil modifié avec succès",
            SIGNUP_SUCCESS: "Vous vous êtes inscrit avec succès",
            EDIT_PASSWORD_SUCCESS: "Mot de passe modifié avec succès"
        },
        errors: {
            ERROR_API: "Oups, une erreur est survenue",
            ERROR_DOWNLOAD_FILE: "Une erreur est survenue lors du téléchargement du fichier",
            ERROR_IMPORTING_FILE: "Une erreur est survenue lors de l'importation du document",
            ERROR_SHARE_FILE: "Une erreur est survenue lors du partage du fichier",
            ERROR_EDIT_PASSWORD: "L'ancien mot de passe est invalide"
        },
        message: {
            WRITE_A_MESSAGE: "Ecrire un message...",
            DELETE_MESSAGE: "Supprimer le message",
            PIN_MESSAGE: "Epingler le message",
            UNPIN_MESSAGE: "Désépingler le message"
        },
        group: {
            GROUPS: "Groupes",
            LEAVE_THIS_GROUP: "Quitter ce groupe",
            LEAVE_GROUP: "Quitter le groupe",
            SURE_TO_LEAVE_GROUP: "Vous êtes sur le point de quitter le groupe",
            FIND_A_GROUP: "Chercher un groupe",
            MY_GROUPS: "Mes groupes",
            CONFIRM_JOIN_GROUP: "Vous vous apprétez à rejoindre ce groupe",
            CREATE_GROUP: "Créer un groupe",
            ADD_TO_GROUP: "Ajouter au groupe",
            CONFIRM_CREATE_GROUP: "Créer le groupe",
            GROUP_MEMBERS: "Membres du groupe",
            DELETE_THIS_GROUP: "Supprimer ce groupe",
            DELETE_GROUP: "Supprimer le groupe",
            SURE_TO_DELETE_GROUP: "Vous êtes sur le point de supprimer le groupe",
            sureToInviteUserToGroup: (userFirstname) => {
                return `Vous êtes sur le point d'inviter ${userFirstname} à ce groupe`;
            }
        },
        event: {
            LEAVE_THIS_EVENT: "Quitter cet évènement",
            LEAVE_EVENT: "Quitter l'évènement",
            SURE_TO_LEAVE_EVENT: "Vous êtes sur le point de quitter l'évènement",
            CONFIRM_JOIN_EVENT: "Vous vous apprétez à rejoindre cet évènement",
            FIND_EVENT_BY: "Chercher un évènement par",
            EVENTS: "Evènements",
            HERE_EVENT_PLACE: "C'est ici que l'évènement aura lieu",
            MY_EVENTS: "Mes évènements",
            FIND_AN_EVENT: "Chercher un évènement",
            CREATE_EVENT: "Créer un évènement",
            ADD_TO_EVENT: "Ajouter à l'évènement",
            CONFIRM_CREATE_EVENT: "Créer l'évènement",
            EVENT_MEMBERS: "Membres de l'évènement",
            DELETE_THIS_EVENT: "Supprimer cet évènement",
            DELETE_EVENT: "Supprimer l'évènement",
            SURE_TO_DELETE_EVENT: "Vous êtes sur le point de supprimer l'évènement",
            WAITING_ADD_EVENT: "Demande d'ajout en attente...",
            sureToInviteUserToEvent: (userFirstname) => {
                return `Vous êtes sur le point d'inviter ${userFirstname} à cet évènement`;
            }
        },
        fields: {
            PASSWORD: "Mot de passe",
            CONFIRM_PASSWORD: "Confirmer le mot de passe",
            MAIL: "Mail",
            USERNAME : "Nom d'utilisateur",
            FIRSTNAME : "Prénom",
            LASTNAME : "Nom",
            PHONE_NUMBER: "Numéro de téléphone",
            FIELD_INCORRECT_VALUES: "Ce champ contient des caractères interdit",
            FIELD_INCORRECT_PASSWORD: "Le mot de passe doit contenir au moins 7 caractères, un numéro et une majuscule",
            FIELD_INCORRECT_CONFIRM_PASSWORD: "Les deux mots de passe ne correspondent pas",
            FIELD_INCORRECT_MAIL: "Le format du mail est invalide",
            FIELD_INCORRECT_MAX_LENGTH: "La valeur dépasse la longueur autorisée",
            FIELD_INCORRECT_MIN_LENGTH: "La valeur ne contient pas assez de caractères",
            FIELD_INCORRECT_LETTERS_ONLY: "Ce champ ne doit contenir que des lettres",
            FIELD_INCORRECT_LESS_THAN_HOUR: "Cette heure doit être plus petite",
            FIELD_INCORRECT_LESS_THAN_DATE: "Cette date doit être plus petite",
            FIELD_INCORRECT_GREATER_THAN_HOUR: "Cette heure doit être plus grande",
            FIELD_INCORRECT_GREATER_THAN_DATE: "Cette date doit être plus grande",
            FIELD_INCORRECT_PHONE_NUMBER: "Le numéro de téléphone est invalide",
            FIELD_INCORRECT_ADDRESS: "Adresse incorrect. Le champ est vide ou contient des caractères non valide ou bien l'adresse est trop longue",
            MONTHS: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
            SHORT_MONTHS: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
            DAYS: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
            SHORT_DAYS: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
            TODAY: "Aujourd'hui"
        },
        search: {
            GLOBAL: "Rechercher un sport, un évènement, un groupe...",
            SEARCH_A_SPORT: "Chercher un sport"
        },
        datetime: {
            TODAY_AT: "Aujourd'hui à",
            AT_MAJ: "À",
            AT_MIN: "à",
            YESTERDAY_AT: "Hier à",
            formats: {
                date: (date) => {
                    if(!(date instanceof Date)){
                        date = parseISO(date);
                    }
                    return format(date, 'dd/MM/yyyy');
                },
                readableDate: (date) => {
                    if(!(date instanceof Date)){
                        date = parseISO(date);
                    }
                    return format(date, 'EEEE, dd LLLL yyyy', {locale: frLocale});
                },
                hour: (hour) => {
                    if(!(hour instanceof Date)){
                        hour = parseISO(hour);
                    }
                    return format(hour, 'HH:mm');
                }
            }
        },
        profile: {
            title: (firstname) => `Profil de ${firstname}`,
            PROFILE: "Profil",
            ADD_AS_FRIEND: "Ajouter en ami",
            LASTNAME: "Nom",
            FIRSTNAME: "Prénom",
            BIRTHDATE: "Date de naissance",
            FAVORITE_SPORT: "Sport favori",
            REGISTRATION_DATE: "Date d'inscription",
            CONTACT: "Contact",
            EMAIL: "Email",
            PHONE_NUMBER: "Numéro de téléphone",
            MEMBER_OF: "Membre de",
            MEMBER_OF_NO_EVENT: "Membre d'aucun évènement",
            DELETE_FRIEND: "Supprimer l'ami(e)",
            SURE_TO_DELETE_FRIEND: "Etes vous sûr de vouloir supprimer cet(te) ami(e) ?"
        },
        rights: {
            RIGHTS: "Droits",
            1: "Expulser un membre",
            2: "Ajouter un membre",
            3: "Supprimer un message",
            4: "Modifier les informations"
        },
        roles: {
            ROLES: "Rôles",
            ROLE: "Rôle",
            ROLE_NAME: "Nom du rôle",
            ROLES_MANAGEMENT: "Gestion des rôles",
            NO_ROLE_CREATED_YET: "Aucun rôle n'a encore été créé",
            DELETE_ROLE: "Supprimer le rôle",
            SURE_TO_DELETE_ROLE: "Etes vous sûr de vouloir supprimer ce rôle ?",
            CREATE_ROLE: "Créer un rôle",
            CREATE_THE_ROLE: "Créer le rôle",
            EDIT_THE_ROLE: "Modifier le rôle",
            ALLOCATE_ROLE_TO: "Allouer un rôle à"
        },
        friends: {
            SEND_A_FRIEND_REQUEST: "Envoyer une demande d'ami",
            CONFIRM_SEND_A_FRIEND_REQUEST: "Vous êtes sur le point d'envoyer une demande d'ami à",
            FRIENDS: "Amis",
            MY_FRIENDS: "Mes amis",
            SEARCH_A_FRIEND: "Chercher un ami",
            NO_FRIENDS: "Vous n'avez pas d'amis",
            FRIEND_REQUEST_WAITING: "Demande d'ami en attente..."
        },
        addPerson: {
            SEARCH_USER: "Chercher un utilisateur...",
            ADD_TO_EVENT: "Ajouter à l'évènement",
            ADD_TO_GROUP: "Ajouter au groupe",
            ADD_TO_CONTACT: "Ajouter aux contacts"
        },
        bookmarks: {
            MY_BOOKMARKS: "Mes favoris",
            NO_BOOKMARK: "Vous n'avez pas encore de favoris",
            DELETE_BOOKMARK: "Supprimer le favori",
            SURE_TO_DELETE_BOOKMARK: "Vous êtes sur le point de supprimer le favori",
            BOOKMARK_SUCCESS: "Ajouté en favori avec succès",
            UNBOOKMARK_SUCCESS: "Retiré des favoris avec succès"
        },
        auth: {
            LOGIN: "Se connecter",
            NO_ACCOUNT: "Pas de compte ?",
            CREATE_AN_ACCOUNT: "Créer un compte"
        },
        sports: {
            BIATHLON: "Biathlon",
            RUNNING: "Course",
            CYCLING: "Cyclisme",
            SHOT_PUT: "Lancer",
            WALK: "Marche",
            MARATHON: "Marathon",
            JUMPS: "Sauts",
            TRIATHLON: "Triathlon",
            CROSSFIT: "Crossfit",
            WEIGHTLIFTING: "Haltérophilie",
            PARKOUR: "Parkour",
            PILATES: "Pilate",
            STEP: "Step",
            YOGA: "Yoga",
            GYMNASTICS: "Gymnastique",
            AIRSOFT: "Airsoft",
            FOOSBALL: "Baby-foot",
            POOL: "Billard",
            BOWLING: "Bowling",
            DANCE: "Danse",
            CHESS: "Echecs",
            HORSEBACK_RIDING: "Equitation",
            KARTING: "Karting",
            PAINTBALL: "Paintball",
            BOCCE: "Pétanque",
            ARCHERY: "Tir à l'arc",
            FRISBEE: "Ultimate",
            BADMINTON: "Badminton",
            BASEBALL: "Baseball",
            BASKETBALL: "Basketball",
            CRICKET: "Cricket",
            FOOTBALL: "Football",
            AMERICAN_FOOTBALL: "Football américain",
            FUTSAL: "Futsal",
            GOLF: "Golf",
            HANDBALL: "Handball",
            HOCKEY: "Hockey sur gazon",
            SQUASH: "Squash",
            BASQUE_PELOTA: "Pelote Basque",
            TENNIS: "Tennis",
            TABLE_TENNIS: "Tennis de table",
            POLO: "Polo",
            RUGBY: "Rugby",
            VOLLEYBALL: "Volleyball",
            WATER_POLO: "Water-polo",
            AIKIDO: "Aïkido",
            BOXING: "Boxe",
            CAPOEIRA: "Capoeira",
            CATCH: "Catch",
            FENCING: "Escrime",
            JUJITSU: "Ju-jitsu",
            JUDO: "Judo",
            KARATE: "Karaté",
            KENDO: "Kendo",
            KENJUTSU: "Kenjutsu",
            KICK_BOXING: "Kick boxing",
            KUNG_FU: "Kung-fu",
            KRAV_MAGA: "Krav-maga",
            MMA: "MMA",
            TAEKWONDO: "Taekwondo",
            BMX: "BMX",
            ICE_HOCKEY: "Hockey sur glace",
            KITESURFING_BOARD: "Kitesurf",
            ICE_SKATING: "Patin sur glace",
            WINDSURFING: "Planche à voile",
            ROLLERSKATING: "Roller",
            SKATEBOARDING: "Skateboard",
            ALPINE_SKIING: "Ski alpin",
            WATER_SKIING: "Ski nautique",
            SNOWBOARDING: "Snowboard",
            SURFING: "Surf",
            WAKEBOARDING: "Wakeboard",
            ROWING: "Aviron",
            CANOEING: "Canoë",
            CANYONING: "Canyoning",
            KAYAKING: "Kayak",
            SWIMMING: "Natation",
            FISHING: "Pêche",
            SNORKELLING: "Plongée sous marine",
            RAFTING: "Rafting",
            BASE_JUMPING: "Base jump",
            ROCK_CLIMBING: "Escalade",
            SKYDIVING: "Parachute",
            PARAGLIDING: "Parapente",
            QUAD_BIKING: "Quad",
            CAR_RALLY: "Rallye automobile"
        },
        settings: {
            PROFIL: 'Gestion du profil',
            APPLY: 'Gestion de l\'application',
            ABOUT: 'A propos',
            TITLE: 'Paramètres',
            LOGOUT: 'Déconnexion'
        },
        welcomeLanguageSelection: {
            SELECT_A_LANGUAGE: "Choisissez une langue"
        },
        settingsApp: {
            TITLE: 'Paramètres de l\'application ',
            NOTIFICATIONS: 'Notifications',
            LANGUAGE: 'Langue'
        },
        changeLanguage: {
            TITLE: 'Langues',
            SELECT_LANGUAGES_FR: 'FR',
            SELECT_LANGUAGES_EN: 'EN'
        },
        changeNotifications: {
            TITLE: 'Notifications',
            TITLE_MESSAGE: 'Messages',
            TITLE_MESSAGE_GROUP: 'Messages de groupe',
            TITLE_MESSAGE_EVENT: 'Messages d\'évènement',
            TITLE_ADD: 'Invitations',
            TITLE_ADD_GROUP: 'Invitations à des groupes',
            TITLE_ADD_EVENT: 'Invitations à des évènements',
            TITLE_ADD_FRIEND: 'Invitations d\'amis',
            TITLE_REMINDER: 'Rappel',
            TITLE_REMINDER_EVENT: 'Me rappeler un évènement'
        },
        about: {
            TITLE: 'À propos',
            DATA_USE_POLICY: 'politique d\'utilisation des données',
            TERMS_OF_USE: 'Conditions d\'utilisation',
            PATCH_NOTE: 'Note de mise à jour',
        },
        profilSettings: {
            PROFILE: "Profil",
            MY_INFORMATIONS: 'Mes informations',
            PH_LASTNAME: 'Nom',
            PH_FIRSTNAME: 'Prénom',
            PH_MAIL: 'Mail',
            CTA_UPDATE: 'Modifier',
            BIRTH: 'Date de naissance',
            CHANGE_PASSWORD: 'Modifier mon mot de passe',
            PH_OLD_PW: 'Ancien mot de passe',
            PH_NEW_PW: 'Nouveau mot de passe',
            PH_COMFIRMATION_PW: 'Confirmation du mot de passe'
        },
        registration: {
            REGISTRATION: "Inscription",
            PASSWORD: "Mot de passe",
            CONFIRM_PASSWORD: "Confirmer le mot de passe",
            SIGN_UP: "S'inscrire"
        },
        pinnedMessages: {
            PINNED_MESSAGES: "Messages épinglés",
            NO_PINNED_MESSAGES: "Aucun message épinglé"
        },
        notifications: {
            NOTIFICATIONS: "Notifications",
            NO_NOTIFS: "Aucune notification",
            NO_REQUEST: "Aucune demande",
            ASK_FRIEND_TITLE: "Demande d'ami",
            ASK_EVENT_TITLE: "Demande d'intégration à un évènement",
            ASK_GROUP_TITLE: "Demande d'intégration à un groupe",
            ADD_EVENT_TITLE: "Invitation d'évènement",
            ADD_GROUP_TITLE: "Invitation de groupe",
            ASK_FRIEND_CONTENT: "souhaite devenir votre ami",
            ASK_EVENT_CONTENT: "souhaite intégrer l'évènement",
            ASK_GROUP_CONTENT: "souhaite intégrer le groupe",
            ADD_EVENT_CONTENT: "Vous êtes invité à un évènement :",
            ADD_GROUP_CONTENT: "Vous êtes invité à un groupe :",
            SEE: "Voir"
        }
    },
    en: {
        ADD: "Add",
        FRIENDS: "Friends",
        HOME: "Home",
        NOTIFICATIONS: "Notifications",
        BOOKMARKS: "Bookmarks",
        CANCEL: "Cancel",
        ADD_CONTACT_PERSON: "Add a contact person",
        SEARCH: "Search",
        USER_ALREADY_EXISTS: "This user already exists",
        CLOSE: "Close",
        FILTERS: "Filters",
        JOIN: "Join",
        RESULTS: "Results",
        PLACE_FILTER_PLACEHOLDER: "Address, city, country, postal code...",
        FILTER_BY: "Filter by",
        DATE: "Date",
        DATES: "Dates",
        PLACE: "Place",
        NO_DATA: "No results",
        OK: "Ok",
        ADDRESS: "Address",
        HOURS: "Hours",
        FROM: "from",
        TO: "to",
        DETAILS: "Details",
        SEE_DETAILS: "See details",
        BOOKMARK_THIS_PLACE: "Bookmark this place",
        UNBOOKMARK_THIS_PLACE: "Unbookmark this place",
        PARAMETERS: "Parameters",
        MUTE: "Mute",
        PEOPLE_LIST: "Members list",
        SHARED_CONTENT: "Shared content",
        COPY_TEXT: "Copy text",
        EDIT_INFOS: "Edit information",
        ATTACHMENT: "Attachment",
        COPY_ATTACHMENT_LINK: "Copy attachment link",
        SAVE_ATTACHMENT: "Save attachment",
        SHARE_ATTACHMENT: "Share attachment",
        COPY_TO_CLIPBOARD: "Copy to clipboard",
        NO_GRANTED_ACCESS: "No granted access",
        PHONE_ACCESS_NOT_GRANTED_TO_MEDIA: "Access to phone library not granted. You can granted the access in phone settings",
        CAMERA: "Camera",
        PHOTO_VIDEO_LIBRARY: "Photo/video library",
        PHOTO_LIBRARY: "Photo library",
        FILE: "File",
        SHARED_CONTENT: "Shared content",
        NO_SHARED_CONTENT: "No shared content",
        EDITING: "Editing",
        START: "Start",
        END: "End",
        SPORT: "Sport",
        DESCRIPTION: "Description",
        NAME: "Name",
        GENERAL: "General",
        SAVE_CHANGES: "Save changes",
        ROLES: "Roles",
        NO_MEMBER: "No member",
        MEMBERS: "Members",
        SEE_PROFILE: "See profile",
        EXCLUDE: "Exclude",
        SURE_TO_EXCLUDE: "Are you sure to exclude",
        MANAGE_ROLE: "Manage role",
        INVITE: "Invite",
        WAITING: "Waiting",
        success: {
            SUCCESS_DOWNLOAD_FILE: "Download successfully completed",
            EDIT_SUCCESS: "Successfully edited",
            CREATE_SUCCESS: "Successfully created",
            EDIT_PROFILE_SUCCESS: "Profile successfully edited",
            SIGNUP_SUCCESS: "Profile successfully created",
            EDIT_PASSWORD_SUCCESS: "Password successfully edited"
        },
        errors: {
            ERROR_API: "Oops, an error has occurred !",
            ERROR_DOWNLOAD_FILE: "An error occured while downloading file",
            ERROR_IMPORTING_FILE: "An error occured while importing file",
            ERROR_SHARE_FILE: "An error occured while sharing file",
            ERROR_EDIT_PASSWORD: "Old password is wrong"
        },
        message: {
            WRITE_A_MESSAGE: "Write a message...",
            DELETE_MESSAGE: "Delete message",
            PIN_MESSAGE: "Pin message",
            UNPIN_MESSAGE: "Unpin message"
        },
        group: {
            GROUPS: "Groups",
            ADD_TO_GROUP: "Add to group",
            SURE_TO_LEAVE_GROUP: "You are going to leave the group",
            LEAVE_GROUP: "Leave group",
            LEAVE_THIS_GROUP: "Leave this group",
            CONFIRM_JOIN_GROUP: "You are going to join this group",
            FIND_A_GROUP: "Find a group",
            MY_GROUPS: "My groups",
            CREATE_GROUP: "Create a group",
            CONFIRM_CREATE_GROUP: "Create group",
            GROUP_MEMBERS: "Group members",
            DELETE_THIS_GROUP: "Delete this group",
            DELETE_GROUP: "Delete group",
            SURE_TO_DELETE_GROUP: "You are going to delete the group",
            sureToInviteUserToGroup: (userFirstname) => {
                return `You are going to invite ${userFirstname} to this group`;
            }
        },
        event: {
            EVENTS: "Events",
            ADD_TO_EVENT: "Add to event",
            LEAVE_THIS_EVENT: "Leave this event",
            LEAVE_EVENT: "Leave event",
            SURE_TO_LEAVE_EVENT: "You are going to leave the event",
            CONFIRM_JOIN_EVENT: "You are going to join this event",
            FIND_AN_EVENT: "Find an event",
            FIND_EVENT_BY: "Find an event by",
            MY_EVENTS: "My events",
            CREATE_EVENT: "Create an event",
            HERE_EVENT_PLACE: "This is here event take place",
            CONFIRM_CREATE_EVENT: "Create event",
            EVENT_MEMBERS: "Event members",
            DELETE_THIS_EVENT: "Delete this event",
            DELETE_EVENT: "Delete event",
            SURE_TO_DELETE_EVENT: "You are going to delete the event",
            WAITING_ADD_EVENT: "Addition request pending...",
            sureToInviteUserToEvent: (userFirstname) => {
                return `You are going to invite ${userFirstname} to this event`;
            }
        },
        fields: {
            PASSWORD: "Password",
            CONFIRM_PASSWORD: "Confirm password",
            MAIL: "eMail",
            USERNAME : "Username",
            FIRSTNAME : "Firstname",
            LASTNAME : "Lastname",
            PHONE_NUMBER: "Phone number",
            FIELD_INCORRECT_VALUES: "This field contains forbidden caracters",
            FIELD_INCORRECT_PASSWORD: "The password must contain at least 7 caracters, 1 number and 1 capital letter",
            FIELD_INCORRECT_CONFIRM_PASSWORD: "Both passwords are not the same",
            FIELD_INCORRECT_MAIL: "Mail format is not valid",
            FIELD_INCORRECT_MAX_LENGTH: "Value exceeds allowable length",
            FIELD_INCORRECT_MIN_LENGTH: "The value does not contain enough caracters",
            FIELD_INCORRECT_LETTERS_ONLY: "This field must only contain letters",
            FIELD_INCORRECT_LESS_THAN_HOUR: "This time should be smaller",
            FIELD_INCORRECT_LESS_THAN_DATE: "This date should be smaller",
            FIELD_INCORRECT_GREATER_THAN_HOUR: "This time should be greater",
            FIELD_INCORRECT_GREATER_THAN_DATE: "This date should be greater",
            FIELD_INCORRECT_ADDRESS: "Address not valid. Contains incorrect caracters or is too long or field is empty",
            FIELD_INCORRECT_PHONE_NUMBER: "Phone number is not valid",
            MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            SHORT_MONTHS: ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sept.','Oct.','Nov.','Dec.'],
            DAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            SHORT_DAYS: ['Sun.','Mon.','Tues.','Wed.','Thu.','Fri.','Sat.'],
            TODAY: "Today"
        },
        search: {
            GLOBAL: "Search a sport, an event, a group...",
            SEARCH_A_SPORT: "Search a sport"
        },
        datetime: {
            TODAY_AT: "Today at",
            AT_MAJ: "At",
            AT_MIN: "at",
            YESTERDAY_AT: "Yesterday at",
            formats: {
                date: (date) => {
                    if(!(date instanceof Date)){
                        date = parseISO(date);
                    }
                    return format(date, 'dd/MM/yyyy');
                },
                readableDate: (date) => {
                    if(!(date instanceof Date)){
                        date = parseISO(date);
                    }
                    return format(date, 'EEEE, dd LLLL yyyy');
                },
                hour: (hour) => {
                    if(!(hour instanceof Date)){
                        hour = parseISO(hour);
                    }
                    hour = format(hour, 'HH:mm');
                    hour = hour.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [hour];
                    if (hour.length > 1) {
                        hour = hour.slice(1);
                        hour[5] = +hour[0] < 12 ? ' AM' : ' PM';
                        hour[0] = +hour[0] % 12 || 12;
                    }
                    return hour.join('');
                }
            }
        },
        profile: {
            title: (firstname) => `${firstname}'s profile`,
            PROFILE: "Profile",
            ADD_AS_FRIEND: "Add as friend",
            LASTNAME: "Lastname",
            FIRSTNAME: "Firstname",
            BIRTHDATE: "Birthdate",
            FAVORITE_SPORT: "Favorite sport",
            REGISTRATION_DATE: "Registration date",
            CONTACT: "Contact",
            EMAIL: "Email",
            PHONE_NUMBER: "Phone number",
            MEMBER_OF: "Member of",
            MEMBER_OF_NO_EVENT: "Member of no event",
            DELETE_FRIEND: "Delete friend",
            SURE_TO_DELETE_FRIEND: "Are you sure to delete this friend ?"
        },
        rights: {
            RIGHTS: "Rights",
            1: "Kick a member",
            2: "Add a member",
            3: "Delete a message",
            4: "Edit informations"
        },
        roles: {
            ROLES: "Roles",
            ROLE: "Role",
            ROLE_NAME: "Role name",
            ROLES_MANAGEMENT: "Roles management",
            NO_ROLE_CREATED_YET: "No role created yet",
            DELETE_ROLE: "Delete role",
            SURE_TO_DELETE_ROLE: "Are you sure to delete role ?",
            CREATE_ROLE: "Create a role",
            CREATE_THE_ROLE: "Create the role",
            EDIT_THE_ROLE: "Edit the role",
            ALLOCATE_ROLE_TO: "Allocate a role to"
        },
        friends: {
            SEND_A_FRIEND_REQUEST: "Send a friend request",
            CONFIRM_SEND_A_FRIEND_REQUEST: "You are going to send a friend request to",
            FRIENDS: "Friends",
            MY_FRIENDS: "My friends",
            SEARCH_A_FRIEND: "Search a friend",
            NO_FRIENDS: "You don't have friends",
            FRIEND_REQUEST_WAITING: "Pending friend request..."
        },
        addPerson: {
            SEARCH_USER: "Search an user...",
            ADD_TO_EVENT: "Add to the event",
            ADD_TO_GROUP: "Add to the group",
            ADD_TO_CONTACT: "Add to contacts"
        },
        bookmarks: {
            MY_BOOKMARKS: "My bookmarks",
            NO_BOOKMARK: "You don't have bookmark yet",
            DELETE_BOOKMARK: "Delete bookmark",
            SURE_TO_DELETE_BOOKMARK: "You are going to delete the bookmark",
            BOOKMARK_SUCCESS: "Bookmarked with success",
            UNBOOKMARK_SUCCESS: "Unbookmarked with success"
        },
        auth: {
            LOGIN: "Log in",
            NO_ACCOUNT: "No account ?",
            CREATE_AN_ACCOUNT: "Create an account"
        },
        sports: {
            BIATHLON: "Biathlon",
            RUNNING: "Running",
            CYCLING: "Cycling",
            SHOT_PUT: "Shot put",
            WALK: "Walk",
            MARATHON: "Marathon",
            JUMPS: "Jumps",
            TRIATHLON: "Triathlon",
            CROSSFIT: "Crossfit",
            WEIGHTLIFTING: "Weightlifting",
            PARKOUR: "Parkour",
            PILATES: "Pilates",
            STEP: "Step",
            YOGA: "Yoga",
            GYMNASTICS: "Gymnastics",
            AIRSOFT: "Airsoft",
            FOOSBALL: "Foosball",
            POOL: "Pool",
            BOWLING: "Bowling",
            DANCE: "Dance",
            CHESS: "Chess",
            HORSEBACK_RIDING: "Horseback riding",
            KARTING: "Karting",
            PAINTBALL: "Paintball",
            BOCCE: "Bocce",
            ARCHERY: "Archery",
            FRISBEE: "Frisbee",
            BADMINTON: "Badminton",
            BASEBALL: "Baseball",
            BASKETBALL: "Basketball",
            CRICKET: "Cricket",
            FOOTBALL: "Football",
            AMERICAN_FOOTBALL: "American football",
            FUTSAL: "Futsal",
            GOLF: "Golf",
            HANDBALL: "Handball",
            HOCKEY: "Hockey",
            SQUASH: "Squash",
            BASQUE_PELOTA: "Basque pelota",
            TENNIS: "Tennis",
            TABLE_TENNIS: "Table tennis",
            POLO: "Polo",
            RUGBY: "Rugby",
            VOLLEYBALL: "Volleyball",
            WATER_POLO: "Water polo",
            AIKIDO: "Aikido",
            BOXING: "Boxing",
            CAPOEIRA: "Capoeira",
            CATCH: "Catch",
            FENCING: "Fencing",
            JUJITSU: "Jujitsu",
            JUDO: "Judo",
            KARATE: "Karate",
            KENDO: "Kendo",
            KENJUTSU: "Kenjutsu",
            KICK_BOXING: "Kick boxing",
            KUNG_FU: "Kung fu",
            KRAV_MAGA: "Krav maga",
            MMA: "MMA",
            TAEKWONDO: "Taekwondo",
            BMX: "BMX",
            ICE_HOCKEY: "Ice hockey",
            KITESURFING_BOARD: "Kitesurfing board",
            ICE_SKATING: "Ice skating",
            WINDSURFING: "Windsurfing",
            ROLLERSKATING: "Rollerskating",
            SKATEBOARDING: "Skateboarding",
            ALPINE_SKIING: "Alpine skiing",
            WATER_SKIING: "Water skiing",
            SNOWBOARDING: "Snowboarding",
            SURFING: "Surfing",
            WAKEBOARDING: "Wakeboarding",
            ROWING: "Rowing",
            CANOEING: "Canoeing",
            CANYONING: "Canyoning",
            KAYAKING: "Kayaking",
            SWIMMING: "Swimming",
            FISHING: "Fishing",
            SNORKELLING: "Snorkelling",
            RAFTING: "Rafting",
            BASE_JUMPING: "Base jumping",
            ROCK_CLIMBING: "Rock climbing",
            SKYDIVING: "Skydiving",
            PARAGLIDING: "Paragliding",
            QUAD_BIKING: "Quad biking",
            CAR_RALLY: "Car rally"
        },
        settings: {
            PROFIL: 'Profile settings',
            APPLY: 'Application settings',
            ABOUT: 'About',
            TITLE: 'Settings',
            LOGOUT: 'Log out'
        },
        welcomeLanguageSelection: {
            SELECT_A_LANGUAGE: "Select a language"
        },
        settingsApp: {
            TITLE: 'App settings',
            NOTIFICATIONS: 'Notifications',
            LANGUAGE: 'Language'
        },
        changeLanguage: {
            TITLE: 'Languages',
            SELECT_LANGUAGES_FR: 'FR',
            SELECT_LANGUAGES_EN: 'EN'
        },
        changeNotifications: {
            TITLE: 'Notifications',
            TITLE_MESSAGE: 'Messages',
            TITLE_MESSAGE_GROUP: 'Chat group',
            TITLE_MESSAGE_EVENT: 'Chat event',
            TITLE_ADD: 'Invitation',
            TITLE_ADD_GROUP: 'Group invitation',
            TITLE_ADD_EVENT: 'Event invitation',
            TITLE_ADD_FRIEND: 'Friend invitation',
            TITLE_REMINDER: 'Reminder',
            TITLE_REMINDER_EVENT: 'Remind me of an event'
        },
        about: {
            TITLE: 'About',
            DATA_USE_POLICY: 'Data use policy',
            TERMS_OF_USE: 'Terms of use',
            PATCH_NOTE: 'Patch note',
        },
        profilSettings: {
            PROFILE: "Profile",
            MY_INFORMATIONS: 'My informations',
            PH_LASTNAME: 'Lastname',
            PH_FIRSTNAME: 'Firstname',
            PH_MAIL: 'Mail ',
            CTA_UPDATE: 'Update',
            BIRTH: 'Date of birth',
            CHANGE_PASSWORD: 'Update my password',
            PH_OLD_PW: 'Old password',
            PH_NEW_PW: 'New password',
            PH_COMFIRMATION_PW: 'Confirm password'
        },
        registration: {
            REGISTRATION: "Registration",
            PASSWORD: "Password",
            CONFIRM_PASSWORD: "Confirm password",
            SIGN_UP: "Sign up"
        },
        pinnedMessages: {
            PINNED_MESSAGES: "Pinned messages",
            NO_PINNED_MESSAGES: "No pinned message"
        },
        notifications: {
            NOTIFICATIONS: "Notifications",
            NO_NOTIFS: "No notification",
            NO_REQUEST: "No request",
            ASK_FRIEND_TITLE: "Friend request",
            ASK_EVENT_TITLE: "Request to join an event",
            ASK_GROUP_TITLE: "Request to join a group",
            ADD_EVENT_TITLE: "Event invitation",
            ADD_GROUP_TITLE: "Group invitation",
            ASK_FRIEND_CONTENT: "wants to be your friend",
            ASK_EVENT_CONTENT: "would like to join this event",
            ASK_GROUP_CONTENT: "would like to join this group",
            ADD_EVENT_CONTENT: "You are invited to join an event :",
            ADD_GROUP_CONTENT: "You are invited to join a group :",
            SEE: "See"
        }
    }
}

/**
 * to target good translation according to language
 * 
 * @param {string} lang "fr" or "en"
 * @return {object} translations for targeted language
 */
export default t = (lang) => {
    return l[lang];
}