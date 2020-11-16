const status_InstanceName = document.querySelector('#status_InstanceName');

const btnTurnOnLighting = document.querySelector('#btnTurnOnLighting');
btnTurnOnLighting.addEventListener('click', () => {
    const trLight = document.querySelector('#trLight');
    btnTurnOnLighting.classList.toggle('btn-warning');
    btnTurnOnLighting.classList.toggle('btn-secondary');
    if (btnTurnOnLighting.classList.contains('btn-warning')) {
        btnTurnOnLighting.innerText = 'Encender';
    } else {
        btnTurnOnLighting.innerText = 'Apagar';
    }
    trLight.classList.toggle('bg-turn-on-light');
});

const btnTurnOnRefrigeration = document.querySelector('#btnTurnOnRefrigeration');
btnTurnOnRefrigeration.addEventListener('click', () => {
    const trTemperature = document.querySelector('#trTemperature');
    btnTurnOnRefrigeration.classList.toggle('btn-primary');
    btnTurnOnRefrigeration.classList.toggle('btn-secondary');
    if (btnTurnOnRefrigeration.classList.contains('btn-primary')) {
        // txtIluminationState.innerText = 'Apagada';
        btnTurnOnRefrigeration.innerText = 'Encender';
    } else {
        // txtIluminationState.innerText = 'Encendida';
        btnTurnOnRefrigeration.innerText = 'Apagar';
    }
    trTemperature.classList.toggle('bg-turn-on-refrigeration');
});

// Instances
const instancesList = document.querySelectorAll('#instances');
instancesList.forEach(element => {
    element.addEventListener('click', () => {
        if (!element.classList.contains('active')) {
            instancesList.forEach(element => {
                element.classList.remove('active');
            });
            element.classList.add('active');
            // Agregar función para actualizar el titulo del estatus (Y su información)
            updateInstanceInfo();
        }
    });
});

const updateInstanceInfo = () => {
    instancesList.forEach(element => {
        if(element.classList.contains('active')){
            status_InstanceName.innerText = element.innerText;
        }
    });
}