# Create Dummy Bookstore data
import json
import random



def generate_books(book_count, resources):
    title = ["Dune", "Avengers", "Infinity War", "The Incredibles", "The Phantom Menace", "Attack of the Clones", "Revenge of the Sith", "A New Hope", "The Empire Strikes Back", "Return of the Jedi"]

    author = ["Obi-Wan Kenobi", "Qui-Gon Jin", "Anakin Skywalker", "Luke Skywalker", "Ahsoka Tano", "Plo Koon", "Ki Adi Mundi", "Leia Organa", "Padme Amidala", "Baylan Skoll",
            "Morgan Elsbeth", "Ezra Bridger", "Sabine Wren", "Caleb Dume", "Hera Syndulla", "Grand Admiral Thrawn", "Sheev Palpatine", "Darth Vader", "Darth Maul",
            "Lord Tyranus", "Asajj Ventress", "Hunter", "Wrecker" ,"Tech", "Crosshair", "Echo", "Omega", "Captain Rex", "Commander Cody", "Garazeb Orrelios", "Mon Mothma"]

    def page_number():
        return random.randint(200, 500)

    genres = ["genre1", "genre2", "genre3", "genre4", "genre5", "genre6", "genre7", "genre8", "genre9", "genre10"]

    for i in range(0, book_count):
        book = {}
        
        book["type"] = "book"
        book["title"] = title[random.randint(0, len(title)-1)]
        book["author"] = author[random.randint(0, len(author)-1)]
        book["pages"] = page_number()
        book["genres"] = []
        genre_count = random.randint(1,len(genres))
        for j in range(1, genre_count):
            prefix = "genre"
            book["genres"].append(prefix+str(j))

        if (random.randint(0, 1) == 0):
            book["stock"] = False
            book["copies"] = 0
        else:
            book["stock"] = True
            book["copies"] = random.randint(1, 20)

        resources.append(book)

def generate_magazines(magazine_count, resources):
    publishers = ["Forbes", "Time", "Wired", "National Geographic", "Rolling Stone", "Fortune", "Sports Illustrated", "The New Yorker", "Vogue"]
    years = ["2024", "2023", "2022", "2021", "2020"]
    issues = ["Summer", "Winter", "Fall", "Spring"]

    for i in range(0, magazine_count):
        magazine = {}

        magazine["type"] = "magazine"
        magazine["publisher"] = publishers[random.randint(0, len(publishers)-1)]
        magazine["year"] = years[random.randint(0, len(years)-1)]
        magazine["issue"] = issues[random.randint(0, len(issues)-1)]
        
        resources.append(magazine)

def write_data(resources):
    # Serializing json
    json_object = json.dumps(resources, indent=4)
    
    # Writing to sample.json
    with open("data2.json", "w") as outfile:
        outfile.write(json_object)



if __name__ == "__main__":
    data = []

    book_count = int(input("How many books?\t\t"))    
    magazine_count = int(input("How many magazines?\t"))

    generate_books(book_count, data)
    generate_magazines(magazine_count, data)
    

    write_data(data)