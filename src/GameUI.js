export class GameUI {
    updateTasksMenu(tasks) {
        const mainDiv = document.getElementById('tasks');
        while (mainDiv.firstChild) {
            mainDiv.removeChild(mainDiv.firstChild);
          }

        tasks.forEach(task => {
            var taskDiv = document.createElement("div");
            taskDiv.classList.add("task");

            var dishNameDiv = document.createElement("img");
            // dishNameDiv.classList.add("dish-name");
            dishNameDiv.classList.add("dish-name-img");
            dishNameDiv.src = `./Images/${task.getInfo().dishName}.png`;
            // dishNameDiv.textContent = task.getInfo().dishName;

            var ingredientsDiv = document.createElement("div");
            ingredientsDiv.classList.add("ingridients");

            task.getInfo().ingridients.forEach(ing => {
                var ingredientDiv = document.createElement("img");
                ingredientDiv.src = `./Images/${ing}.png`;
                ingredientsDiv.appendChild(ingredientDiv);
            });

            var time = document.createElement("div");
            time.classList.add("time");
            let a = task.getInfo().time / task.dish.time * 100;
            time.style.width = `${a + 1}%`;
            // time.textContent = task.getInfo().time;

            taskDiv.appendChild(dishNameDiv);
            taskDiv.appendChild(ingredientsDiv);
            taskDiv.appendChild(time);
            mainDiv.appendChild(taskDiv);
        });
    }

    updateStationTime(stations) {
        // Создание родительского элемента <div> с идентификатором "stations-info"
        var stationsInfoDiv = document.getElementById("stations-info");
        while (stationsInfoDiv.firstChild) {
            stationsInfoDiv.removeChild(stationsInfoDiv.firstChild);
        }

        // Создание элементов и добавление их в родительский элемент
        stations.forEach(function(station) {
        // Создание элемента <div> с классом "station-info"
        var stationInfoDiv = document.createElement("div");
        stationInfoDiv.classList.add("station-info");

        // Создание элемента <div> с классом "station-name"
        var stationNameDiv = document.createElement("div");
        stationNameDiv.classList.add("station-name");
        stationNameDiv.textContent = station.getName();

        // Создание элемента <div> с классом "station-time" и идентификатором соответствующим времени
        var stationTimeDiv = document.createElement("div");
        stationTimeDiv.classList.add("station-time");
        stationTimeDiv.id = station.name.toLowerCase().replace(":", "-") + "-time";
        stationTimeDiv.textContent = station.getTime();

        // Добавление элементов внутрь родительского элемента
        stationInfoDiv.appendChild(stationNameDiv);
        stationInfoDiv.appendChild(stationTimeDiv);
        stationsInfoDiv.appendChild(stationInfoDiv);
        });
    }

    updateLevelTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = `${time - minutes*60}`;
        if(time - minutes*60 < 10) {
            seconds = '0' + seconds;
        }
        document.getElementById('levelTime').innerText = `${minutes}:${seconds}`;
    }
}

window.ui = new GameUI();