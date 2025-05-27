const today = new Date();

export const usersCount = {
        id: "0710 2002 2304 2001", 
        users: [
            "Joel",
            "Yessica",
        ],
        password: "ahorropuro",
        movements: [
            {
                date: today.toLocaleDateString(),
                description: "Apertura",
                amount: Intl.NumberFormat("es-Es", {style: "currency", currency: "EUR"}).format(0),      
                total: Intl.NumberFormat("es-Es", {style: "currency", currency: "EUR"}).format(0),
                user: "Joel"
            }
        ]
    };
