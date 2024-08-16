const parent = document.querySelector('.cirle-animated');
const children = parent.querySelectorAll('.animated-country');
const radius = parent.scrollWidth / 2; 
const numChildren = children.length; 
const angleStep = -45; 
const paragraphe = document.querySelector(".main__section-description");
const input = document.querySelector(".input__container input");
const reg = /^[^!@#$%^&*()]+$/;

const nav = document.querySelector(".header__nav");
const media = window.matchMedia("(max-width: 1150px)");
const burger = document.querySelector(".burger");
const navList = document.querySelector(".header__list")

burger.addEventListener("click", () => {
    if(!burger.classList.contains("active")) {
        burger.classList.add("active");
        navList.style.display = "flex";
        navList.style.height = `${navList.scrollHeight}px`;
    } else {
        burger.classList.remove("active");
        navList.style.height = "0";
        setTimeout(() => {
            navList.style.display = "none";
        }, 500);
        
        
    }
})

function match(value) {
    if (value.matches) {
        nav.classList.add("mobile");
    } else {
        nav.classList.remove("mobile");
    }
}
match(media)
media.addEventListener("change", match);

input.addEventListener("input", (event) => {
    if(!reg.test(input.value)) {
        console.log("Invalid value");
    }
})

fetch("https://baconipsum.com/api/?type=lucky")
.then((response) => {
    if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}).then(response => {
    paragraphe.textContent = response[Math.floor(Math.random() * 5)];
}).catch(err => {
    console.log(err);
})

async function Animate() {
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
       
            await new Promise(resolve => setTimeout(resolve, 450)); 
            const angle = angleStep * i;
            const radians = 135 - (angle * Math.PI) / 180; 
        
            const x = radius + radius * Math.cos(radians) - child.scrollWidth / 2;
            const y = radius + radius * Math.sin(radians) - child.scrollHeight / 2;
        
            child.style.left = `${x}px`;
            child.style.top = `${y}px`;

            if (i === (children.length - 1)) {
                await new Promise(resolve => setTimeout(resolve, 450)); 
                parent.classList.add("rotate");
                for (let i = 0; i < children.length; i++) {
                    children[i].classList.add("img-rotate");
                }
                
            }
       
    }
}


Animate();



