const socket = io();

socket.on("addproducts", (data) => {
  renderProducts(data);
  populateProductSelect(data);
});

const renderProducts = (products) => {
  let contenidoHTML = "";

  products.forEach((item) => {
    ;
  });

  document.getElementById("content").innerHTML = contenidoHTML;
};

const cleanDeletedProduct = () => {
  const productId = document.getElementById("product_id");
  productId.innerHTML = "<option value=''>Select a product</option>"; 
};

const populateProductSelect = (products) => {
  const productId = document.getElementById("product_id");
  cleanDeletedProduct();

  products.forEach((item) => {
    let option = document.createElement("option");
    option.value = item._id;
    option.innerHTML = item.title;
    productId.appendChild(option);
  });
};

const addProduct = () => {
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const code = document.getElementById("code");
  const price = document.getElementById("price");
  const category = document.getElementById("category");
  const image = document.getElementById("image");

  if (!title.value || !description.value || !code.value || !price.value || !category.value) {
    alert("Please fill in all the mandatory fields.");
    return; 
  }

  if (isNaN(price.value) || parseFloat(price.value) <= 0) {
    alert("Price has to be a  number greater than 0.");
    return;
  }

  const product = {
    title: title.value,
    description: description.value,
    stock: true,
    code: code.value,
    price: parseFloat(price.value),
    category: category.value,
    thumbnails: [image.value]
  };
  socket.emit("newProduct", product);

  title.value = "";
  description.value = "";
  code.value = "";
  price.value = "";
  category.value = "";
  image.value = "";

  const successMessage = document.getElementById("state1");
  successMessage.innerHTML = `<div class="alert alert-success" role="alert">Product added successfully!</div>`;

  setTimeout(() => {
    successMessage.innerHTML = "";
  }, 5000);
};

const showMessage = (type, message) => {
  const statusElement = document.getElementById("state1");
  const alertType = type === "success" ? "alert-success" : "alert-danger";
  statusElement.innerHTML = `<div class="alert ${alertType}" role="alert">${message}</div>`;

  setTimeout(() => {
    statusElement.innerHTML = "";
  }, 5000);
};

const clearForm = () => {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("code").value = "";
  document.getElementById("price").value = "";
  document.getElementById("category").value = "";
  document.getElementById("image").value = "";
};

const deleteProduct = () => {
  const productId = document.getElementById("product_id").value;

  if (!productId) {
    showMessage("error", "Please, select a product to delete.");
    return;
  }

  socket.emit("deleteProduct", productId);

  showMessage("error", "Product deleted successfully!");
};
