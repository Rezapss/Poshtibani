// form var
const multiStepForm =document.querySelector("[data-multi-step]")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]

// date var
let date = moment();

// singature var
const canvas = document.querySelector('canvas');
const form = document.querySelector('.signature-pad');
const clearButton = document.querySelector('.clear-button');
const ctx = canvas.getContext('2d');
let writingMode = false;

// checkbox
const checkbox = document.querySelector("#checkbox")

// jam-avari
const jamAvari = document.querySelector("#jam-avari")
const divMayoub = document.querySelector("#div-mayoub")
const serialNumber = document.querySelector("#s-n")

// listner
const rol = document.querySelector("#rol-number")

// form
let currentStep =
    formSteps.findIndex((step) => {
    return step.classList.contains("active")
})

if (currentStep < 0){
    currentStep = 0
    showCurrentStep()
}
multiStepForm.addEventListener("click",e => {
    let incrementor
    if (e.target.matches("[data-next]")){
        incrementor = 1
    }else if (e.target.matches("[data-previous]")){
        incrementor = -1
    }
    if (incrementor==null)return

    const inputs = [...formSteps[currentStep].querySelectorAll("input")]
    const allValid = inputs.every(input =>input.reportValidity())
    if (allValid){
        currentStep += incrementor
        showCurrentStep()
    }
    
})
function showCurrentStep(){
    formSteps.forEach((step , index) =>{
        step.classList.toggle("active", index === currentStep)
    })
}


// date
date = date.format('jYYYY/jM/jD');
document.getElementById('date-now').innerHTML = date


// signature
form.addEventListener('submit',(Event) =>{
    Event.preventDefault();

    const imageURL= canvas.toDataURL();
    const image = document.createElement('img');
    image.src = imageURL;
    image.height = canvas.height;
    image.width = canvas.width;
    image.style.display = 'block';
    form.appendChild(image);
    clearPad()
})

const clearPad = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

clearButton.addEventListener('click', (Event) => {
    Event.preventDefault();
    clearPad();
})

const getTargetPosition = (Event) =>{
    positionX = Event.clientX - Event.target.getBoundingClientRect().x;
    positionY = Event.clientY - Event.target.getBoundingClientRect().y;

    return [positionX,positionY];
}

const handlePointerMove = (Event) => {
    if (!writingMode) return

    const [positionX,positionY] = getTargetPosition(Event);
    ctx.lineTo(positionX,positionY);
    ctx.stroke();
}

const handlePointerUp = (Event) => {
    writingMode = false;
}

const handlePointerDown = (Event) => {
    writingMode = true;
    ctx.beginPath();

    const [positionX,positionY] = getTargetPosition(Event);
    ctx.moveTo(positionX,positionY);
}

ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap = 'round';

canvas.addEventListener('pointerdown',handlePointerDown,)
canvas.addEventListener('pointerup',handlePointerUp,)
canvas.addEventListener('pointermove',handlePointerMove,)


// EventListener

checkbox.addEventListener("click",function(e){
    if(checkbox.checked){
        rol.innerHTML = `<input type="number" name="rol-number" placeholder="تعداد رول" required>`
    }else{
        rol.innerHTML=""
    }
})

// jamAvari

jamAvari.onchange = function(){
    let optionValue = this.value;
    if(optionValue == 3){
        divMayoub.innerHTML= `
        <h4>دلیل فرعی</h4>
        <select name="dalil-farei" required>
        <option value="" disabled selected >انتخاب کنید</option>
        <option value="1">لیست جمع آوری</option>
        <option value="2">انصراف پذیرنده</option>
        <option value="3">پایانه معیوب</option>
    </select>
    <div class="form-group" id="s-n">
    <input type="text" name="s-n" placeholder="سریال دستگاه" required>
    </div>`
    }else{
        divMayoub.innerHTML = ""
    }
    
}


