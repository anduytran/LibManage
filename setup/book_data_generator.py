# Create Dummy Bookstore data
import json
import random

def generate_books():
            
    doc_count = input("How many books?\n")

    title = ["Dune", "Avengers", "Infinity War", "The Incredibles", "The Phantom Menace", "Attack of the Clones", "Revenge of the Sith", "A New Hope", "The Empire Strikes Back", "Return of the Jedi"]

    author = ["Obi-Wan Kenobi", "Qui-Gon Jin", "Anakin Skywalker", "Luke Skywalker", "Ahsoka Tano", "Plo Koon", "Ki Adi Mundi", "Leia Organa", "Padme Amidala", "Baylan Skoll",
            "Morgan Elsbeth", "Ezra Bridger", "Sabine Wren", "Caleb Dume", "Hera Syndulla", "Grand Admiral Thrawn", "Sheev Palpatine", "Darth Vader", "Darth Maul",
            "Lord Tyranus", "Asajj Ventress", "Hunter", "Wrecker" ,"Tech", "Crosshair", "Echo", "Omega", "Captain Rex", "Commander Cody", "Garazeb Orrelios", "Mon Mothma"]

    def page_number():
        return random.randint(200, 500)

    def rating():
        return random.randint(1, 10)

    genres = ["genre1", "genre2", "genre3", "genre4", "genre5", "genre6", "genre7", "genre8", "genre9", "genre10"]

    
    bookstore = []

    for i in range(0, int(doc_count)):
        data = {}
        
        data["title"] = title[random.randint(0, len(title)-1)]
        data["author"] = author[random.randint(0, len(author)-1)]
        data["pages"] = page_number()
        data["genres"] = []
        genre_count = random.randint(1,len(genres))
        for j in range(1, genre_count):
            prefix = "genre"
            data["genres"].append(prefix+str(j))
        
        if (random.randint(0, 1) == 0):
            data["stock"] = False
            data["copies"] = 0
        else:
            data["stock"] = True
            data["copies"] = random.randint(1, 20)
    
        bookstore.append(data)

    print(bookstore)

    # Serializing json
    json_object = json.dumps(bookstore, indent=4)
    
    # Writing to sample.json
    with open("data.json", "w") as outfile:
        outfile.write(json_object)


if __name__ == "__main__":
    generate_books()