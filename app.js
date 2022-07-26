const { MongoClient } = require('mongodb')
const ObjectID = require('mongodb').ObjectID
const atlasPassword = require('./auth/atlas-password')

// == Database Configuration ==
    // [1] URI Connect
        // Cloud/MongoDB Atlas
        const uriAtlas = `mongodb+srv://hzlnqodrey:${atlasPassword}@cluster-study-hazlan.se8vsu4.mongodb.net/?retryWrites=true&w=majority`

        // Local
        const uriLocal = 'mongodb://127.0.0.1:27017'

    // [2] Database Name
    const dbName = 'administration'

    // [3] Client Config
    const client = new MongoClient(uriLocal, {
        useUnifiedTopology: true
    })

client.connect((error, client) => {
    if (error) {
        return console.log('Koneksi gagal!')
    }

    console.log('Koneksi berhasil!')

    // pilih database
    const db = client.db(dbName)
    
    // CRUD Operations
    // [1 - ADD ONE] Add 1 Data to mahasiswa's collection
    db.collection('mahasiswa').insertOne(
        {
            nama: "Anggit Pambudi",
            email: "anggit.pmbd@gmail.com"
        },
        (error, result) => {
            if (error) {
                return console.log("Gagal menambahkan data!");
            }

            console.log(result);
        }
    )
    // [1.1 - ADD MANY] Add Many Data to mahasiswa's collection
    db.collection('mahasiswa').insertMany(
        [
            {
                nama: "Gilang Martadinata",
                email: "gmd@gmail.com"
            },
            {
                nama: "Sang Bintang Putera Alam",
                email: "bintangpoetra@gmail.com"
            },
            {
                nama: "Pratama Azmi Atmajaya",
                email: "pratamacompeteros@gmail.com"
            },
            {
                nama: "Najma",
                email: "najmafahmi1@gmail.com"
            },
            {
                nama: "Julio Fahcrel",
                email: "juliofachrel@unpad.ac.id"
            },
        ],
        (error, result) => {
            if (error) {
                return console.log("Data tidak berhasil dimasukkan");
            }

            console.log(result);
        } 
    )

    // [2 - READ-ALL] Read (menampilkan semua data yang ada di collection 'mahasiswa')
    db.collection('mahasiswa')
        .find()
        .toArray((error, result) => {
            console.log(result);
        })

    // [2.1 - READ-BY-<FILTER>] Read (menampilkan spesifik (masukkan kriteria di parameter .find()) data yang ada di collection 'mahasiswa')
    db.collection('mahasiswa')
        .find({ nama: "Najma"})
        .toArray((error, result) => {
            console.log(result);
        })

    // [3 - UPDATE ONE] Update one (mengubah satu data berdasarkan ID) [=> updateOne() <=]
    // First param is Filter
    // Second param is setting the new value 
    const updatePromise =  db.collection('mahasiswa').updateOne(
        // Query/Filtering
        {
            _id: ObjectID('62df77e8998dcae58a992f11')
        },
        // Setting the New Value
        {
            $set: {
                email: 'c2297f2531@bangkit.academy'
            }
        }
    )

    updatePromise
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })

    // [3.1 - UPDATE MANY] Update many (mengubah banyak data berdasarkan ID) [=> updateMany() <=]
    // First param is Filter
    // Second param is setting the new value 
    const updatePromise =  db.collection('mahasiswa').updateMany(
        // Query/Filtering
        {
            nama: 'Aslan | The Golden Lion'
        },
        // Setting the New Value
        {
            $set: {
                nama: "Hazlan Muhammad Qodri"
            }
        }
    )

    updatePromise
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })

    // [4 - DELETE ONE] Delete one (menghapus satu data sesuai filter)
    db.collection('mahasiswa')
        .deleteOne({
                nama: "Silver Queen"
        })
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error);
        })

    // [4 - DELETE MANY] Delete one (menghapus banyak data sesuai filter)
    db.collection('mahasiswa')
        .deleteMany({
                nama: "Hazlan Muhammad Qodri"
        })
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error);
        })
        
})