$(function () {
console.log("something")
    //Creating a new workout
    $(".new-workout").on("submit", function (event) {
        event.preventDefault();
        console.log("is this working")
        const newName = $("#new-workout").val().trim();

        $.ajax({
            url: "/api/workouts",
            method: "POST",
            data: { name: newName }
        }).then((dbWorkout) => {
            console.log(dbWorkout);
            location.reload();
        })
    })

    //create new exercise
    $(".new-exercise").on("submit", function (event) {
        event.preventDefault();
        console.log($(this).attr("id"));
        const newExerObj = {
            _id: $(this).attr("id"),
            name: event.target[0].value.trim(),
            type: event.target[1].value.trim(),
            weight: event.target[2].value.trim(),
            sets: event.target[3].value.trim(),
            reps: event.target[4].value.trim(),
            duration: event.target[5].value.trim(),
            distance: event.target[6].value.trim()
        }
        console.log("creating a new exercise");
        console.table(newExerObj);

        $.ajax({
            url: "/api/exercises/:id",
            method: "POST",
            data: newExerObj
        })
            .then(dbExercise => {
                $.ajax({
                    url: "",
                    context: document.body,
                    success: function (data, err) {
                        $(this).html(data);
                    }
                })
            })
    })

    //deleting an exercise
    $(".exer-delete").click(function (event) {
        event.preventDefault();
        console.log($(this).attr("id"))

        $.ajax({
            url: "/api/exercises/:id",
            method: "DELETE",
            data: { _id: $(this).attr("id") }
        }).then((dbExercise) => {
            $.ajax({
                url: "/",
                context: document.body,
                success: function (data, err) {
                    if (err) console.log(err);
                    $(this).html(data);
                }
            })

        })
        setTimeout(function () { location.reload(); }, 100);
    })

    $(".workout-delete").click(function (event) {
        event.preventDefault();
        console.log($(this).attr("id"));

        $.ajax({
            url: "/api/workouts",
            method: "DELETE",
            data: { _id: $(this).attr("id") }
        }).then((dbWorkout) => {
            console.log('script side')
        })
        setTimeout(function () { location.reload(); }, 100);

    })
})

