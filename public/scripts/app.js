// Client facing scripts here
$(() => {

  const createFoodElement = (foods) => {
    let $foodArticle = $(`
    <article id='${foods.id}'>
      <span>
        <h2>${foods.name}</h2>
        <p>${foods.description}</p>
        <div>
          <p>${foods.price}</p>
          <button class="minus">-</button>
          <p class="quantity"> 0 </p>
          <button class="plus">+</button>
        </div>
      </span>
      <span>
        <img
          alt="${foods.name}"
          src="${foods.image_url}"
        >
        </img>
      </span>
    </article>
    `);

    return $foodArticle;
  };


  const renderFoods = function(foodsArr) {
    $('#food-card-container').empty();

    console.log("foodsArr:", foodsArr);

    for (let food of foodsArr) {
      let newFood = createFoodElement(food);
      $('#food-card-container').prepend(newFood);
    }

    $('.minus').on('click', (event) => {
      event.preventDefault();
      const foodId = $(event.target).closest('article').attr('id');
      console.log("(this) minus: ", $(event.target).closest('article').attr('id'));
      $.post(`/cart/${foodId}/edit`, { action: 'decrement' })
        .then((res) => {
          console.log("inside minus .then");
          const foodId = res.food_id;
          console.log(`#${foodId}`);
          const quantity = res.quantity;
          $(`#${foodId}`).find('.quantity').text(quantity);

          // $('.quantity').text(quantity);$(event.target).closest('article').attr('id')
        })
        .catch((err) => { err.message; });
      console.log("decrement clicked");
    });


    $('.plus').on('click', (event) => {
      event.preventDefault();
      const foodId = $(event.target).closest('article').attr('id');
      console.log("(this) plus: ", $(event.target).closest('article').attr('id'));
      $.post(`/cart/${foodId}/edit`, { action: 'increment' })
        .then(res => {

          const foodId = res.food_id;
          const quantity = res.quantity;
          $(`#${foodId}`).find('.quantity').text(quantity);
          console.log("inside plus .then");
          //$(".quantity").text(quantity);
        })
        .catch((err) => { err.message; });
      console.log("increment clicked");
    });

  };


  // receive json data from /foods/menu_items
  const loadFoods = function() {
    $.get('/foods/menu_items', { action: 'getFoods' })
      .then((arr) => {
        console.log("arr in loadfoods:", arr);
        renderFoods(arr);
      })
      .catch((err) => { err.message; });
  };


  loadFoods();


  $('#twilio').on('click', (event) => {
    // prevents page from changing
    event.preventDefault();
    console.log("An estimated time has been sent.");
    $.ajax({
      url: "/order_status/admin/:order_id",
      method: "POST",
    })
      .catch((error) => {
        console.log("error message: ", error.message);
      });
  });

});
