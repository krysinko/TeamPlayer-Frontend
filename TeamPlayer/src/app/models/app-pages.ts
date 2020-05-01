export class SinglePageDetails {
    title: string;
    url: string;
    icon: string;
}

export class AppPages {
    main: SinglePageDetails = {
        title: 'Strona główna',
        url: '/main',
        icon: 'cube-outline'
    };
    tasks: SinglePageDetails = {
        title: 'Zadania',
        url: '/tasks',
        icon: 'list-outline'
    };
    meetings: SinglePageDetails = {
        title: 'Spotkania',
        url: '/meetings',
        icon: 'calendar-outline'
    };
    note: SinglePageDetails = {
        title: 'Notatki',
        url: '/note',
        icon: 'reader-outline'
    };
    teams: SinglePageDetails =
        {
            title: 'Zespoły',
            url: '/teams',
            icon: 'people-outline'
        };
    myProfile: SinglePageDetails =
        {
            title: 'Mój profil',
            url: '/my-profile',
            icon: 'person-circle-outline'
        };

    getPageDetails(locationUrl): SinglePageDetails {
        return Object.values(this)
            .filter(page => {
                return page.url === locationUrl;
            })
            .shift();
    }
}
