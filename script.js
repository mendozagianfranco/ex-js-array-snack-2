const books = [
    {
        title: "React Billionaire",
        pages: 250,
        author: {
            name: 'Alice',
            age: 35
        },
        available: false,
        price: '101€',
        tags: ['advanced', 'js', 'react', 'senior']
    },
    {
        title: "Advanced JS",
        pages: 500,
        author: {
            name: 'Bob',
            age: 20
        },
        available: true,
        price: '25€',
        tags: ['advanced', 'js', 'mid-senior']
    },
    {
        title: "CSS Secrets",
        pages: 320,
        author: {
            name: 'Alice',
            age: 17
        },
        available: true,
        price: '8€',
        tags: ['html', 'css', 'junior']
    },
    {
        title: "HTML Mastery",
        pages: 200,
        author: {
            name: 'Charlie',
            age: 50
        },
        available: false,
        price: '48€',
        tags: ['html', 'advanced', 'junior', 'mid-senior']
    },
];

// Snack 1 - Filtra e Modifica
// Crea un array(longBooks) con i libri che hanno più di 300 pagine;
// Creare un array(longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
// Stampa in console ogni titolo nella console.

const longBooks = books.filter(b => b.pages > 300);
console.log(longBooks);

const longBooksTitles = longBooks.map(b => b.title);
console.log(longBooksTitles);

books.forEach(b => console.log(b.title));

// Snack 2 - Il primo libro scontato
// Creare un array(availableBooks) che contiene tutti i libri disponibili.
// Crea un array(discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20 % (mantieni lo stesso formato e arrotonda al centesimo)
// Salva in una variabile(fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero(senza centesimi).

const availableBooks = books.filter(b => b.available === true);
console.log(availableBooks);

let discount = 20;
const discountedBooks = availableBooks.map(b => {
    let price = b.price.replace('€', '');
    let priceDiscount = Number(price) * (discount / 100);
    let priceFinal = price - priceDiscount;
    b.price = priceFinal;
    return b;
});
console.log(discountedBooks);

const fullPricedBook = discountedBooks.find(b => Number.isInteger(b.price));
console.log(fullPricedBook);


// Snack 3 - Ordinare gli Autori
// Creare un array(authors) che contiene gli autori dei libri.
// Crea una variabile booleana(areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
// Ordina l’array authors in base all’età, senza creare un nuovo array.
// (se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente

const authors = books.map(b => b.author);
console.log(authors);

const areAuthorsAdults = authors.every(a => a.ge > 18);
console.log(areAuthorsAdults);

// authors.sort((a, b) => (a.age - b.age) * (areAuthorsAdults ? 1 : -1));

if (areAuthorsAdults) {
    authors.sort((a, b) => a.age - b.age);
} else {
    authors.sort((a, b) => b.age - a.age);
}
console.log(authors);

// Snack 3 - Calcola l’età media
// Creare un array(ages) che contiene le età degli autori dei libri.
// Calcola la somma delle età(agesSum) usando reduce.;
// Stampa in console l’età media degli autori dei libri.

const ages = authors.map(a => a.age);
console.log(ages);

const agesSum = ages.reduce((acc, curr) => {
    return acc + curr;
}, 0);
console.log(agesSum);

const averageAge = agesSum / ages.length;
console.log(averageAge);

// Snack 5(Bonus) - Raccogli i libri;

// Usando la l'API https://boolean-spec-frontend.vercel.app/freetestapi/books/{id} usa la combinazione di .map() e Promise.all(), per creare una funzione (getBooks) che a partire da un array di id (ids), ritorna una promise che risolve un array di libri (books).
// Testala con l’array[2, 13, 7, 21, 19].

async function fetchJson(url) {
    const response = await fetch(url);
    const obj = await response.json();
    return obj;
}


async function getBooks(ids) {

    const promise = ids.map(i => fetchJson(`http://localhost:3333/books/${i}`));

    const books = await Promise.all(promise);
    return books;


}
// getBooks([2, 13, 7, 21, 19])
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

// Snack 6(Bonus) - Ordina i libri
// Crea una variabile booleana(areThereAvailableBooks) per verificare se c’è almeno un libro disponibile.
// Crea un array(booksByPrice) con gli elementi di books ordinati in base al prezzo(crescente).
// Ordina l’array booksByPricein base alla disponibilità(prima quelli disponibili), senza creare un nuovo array.

const areThereAvailableBooks = books.some(b => b.available === true);
console.log(areThereAvailableBooks);

const booksByPrice = books
    .map(b => {
        let price = b.price;
        if (typeof price === 'string') {
            price = Number(b.price.replace('€', ''));
            b.price = price;
        }
        return b;
    })
    .sort((a, b) => a.price - b.price);
console.log(booksByPrice);

booksByPrice.sort((a, b) => {
    if (a.available === true && b.available === false) {
        return -1;
    } else if (a.available === false && b.available === true) {
        return 1;
    } else {
        return 0;
    }
});
console.log(booksByPrice);


// Snack 7(Bonus) - Analizza i tag
// Usa reduce per creare un oggetto(tagCounts) che conta quante volte ogni tag viene usato tra i libri.

// const tagCounts = books.reduce((acc, curr) => {
//     curr.tags.forEach(t => {
//         if (acc?.t === undefined) {
//             acc[t] = 0;
//         } else {
//             acc[t] += 1;
//         }
//     });
//     return acc;

// }, {});

const tagCounts = books.reduce((acc, b) => {
    b.tags.forEach(tag => {
        if (!acc[tag]) {
            acc[tag] = 0;
        }
        acc[tag]++;
    });
    return acc;
}, {});

console.log(tagCounts);
