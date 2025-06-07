

function uploadImage() {
    let fileInput = document.getElementById('imageUpload');
    let resultText = document.getElementById('result');
    let preview = document.getElementById('preview');
    let infoBlock = document.getElementById('infoBlock');
    let animalInfo = document.getElementById('animalInfo');

    if (!fileInput.files[0]) {
        resultText.innerText = "Please select an image!";
        return;
    }

    let file = fileInput.files[0];
    let formData = new FormData();
    formData.append("file", file);

    // Preview
    let reader = new FileReader();
    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
    };
    reader.readAsDataURL(file);

    // Fetch prediction
    fetch("/predict", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            resultText.innerText = "Error: " + data.error;
            infoBlock.style.display = "none";
        } else {
            resultText.innerText = "Prediction: " + data.prediction;
            infoBlock.style.display = "block";
            animalInfo.innerText = getAnimalInfo(data.prediction);
        }
    })
    .catch(error => {
        resultText.innerText = "Error occurred!";
        infoBlock.style.display = "none";
    });
}

// Provide info based on prediction
function getAnimalInfo(animal) {
    const infoMap = {
        "butterfly":" The butterfly is a delicate insect known for its colorful wings and graceful flight. It undergoes a remarkable transformation called complete metamorphosis, starting as an egg, then becoming a caterpillar (larva), forming a chrysalis (pupa), and finally emerging as a butterfly. Butterflies primarily feed on nectar from flowers and are commonly found in gardens, meadows, and forests. Their role in pollination makes them important to ecosystems.",
        "Cat": " The cat is a small, agile mammal widely kept as a pet. Cats are independent, curious, and known for their cleanliness and hunting instincts. They are natural carnivores and often feed on small animals or specially formulated cat food. Cats can rotate their ears to detect sounds from all directions, and they communicate through vocalizations, body language, and purring.",
        "chicken": " The chicken is a domesticated bird commonly raised for its eggs and meat. Found on farms and in backyards, chickens are omnivores, feeding on seeds, insects, and grains. They are social animals with complex vocal communication, including specific sounds to warn of predators. Chickens are also known to have good memories and can recognize dozens of faces.",
        "cow": " The cow is a large herbivorous mammal that plays a vital role in agriculture. Commonly raised for milk, meat, and leather, cows are gentle creatures often found grazing in fields or pastures. They have a four-chambered stomach that helps them digest fibrous plant materials through a process called rumination. Cows are social animals and can form bonds with both other cows and humans.",
        "Dog": " The dog is one of the most popular and loyal domestic animals. Dogs are known for their intelligence, obedience, and companionship. They come in a variety of breeds, each with distinct traits and temperaments. Dogs are omnivores and are used in many roles such as guarding, therapy, guiding the visually impaired, and even in law enforcement due to their keen sense of smell.",
        "Elephant":" The elephant is the largest land animal and is recognized for its massive size, long trunk, and large ears. Native to Africa and Asia, elephants are herbivores and consume large amounts of vegetation daily. They are highly intelligent and social creatures, often traveling in herds led by a matriarch. Elephants are known for their strong memory and emotional intelligence, and their trunks are extremely versatile, capable of performing delicate and powerful tasks.",
        "horse": " The horse is a powerful and graceful mammal that has been domesticated for transportation, farming, and sports. Horses are herbivores and thrive on grass, hay, and grains. They are intelligent and social, with the ability to form strong bonds with humans. Horses can sleep standing up and have excellent senses of hearing and vision, which help them detect danger in the wild.",
        "sheep": " The sheep is a gentle, wool-covered mammal commonly raised for wool, milk, and meat. Sheep are herd animals that live in grassy fields and are highly social. They are herbivores and mainly eat grass and hay. Sheep have surprisingly good memories and are capable of recognizing individual faces of both other sheep and humans, which aids in their social behavior.",
        "spyder": " The spider is an arachnid, not an insect, with eight legs and the unique ability to spin silk. Spiders are carnivores and usually feed on insects caught in their webs. They are found in a wide range of environments, from forests and gardens to inside homes. While some spiders are venomous, most are harmless to humans and help control pest populations.",
        "squirrel": " The squirrel is a small to medium-sized rodent known for its bushy tail and agility. Squirrels are primarily herbivores, feeding on nuts, seeds, fruits, and sometimes insects. They are found in trees, parks, and urban areas. Squirrels are known for their ability to climb and jump between branches, and they often bury food to store for later use.",
        "Other": " This appears to be an animal outside the defined classes."
    };
    return infoMap[animal] || "No additional info available.";
}



