import react, { useState, useEffect } from "react";
import styles from "../stylesheets/productInfo.css";

import axios from "axios";
import { Rate, Input, Button, Radio } from "antd";
import "antd/dist/antd.css";
import { TiAttachmentOutline } from "react-icons/ti";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterFill } from "react-icons/ri";
import { AiOutlineGoogle } from "react-icons/ai";

import { useCookies } from "react-cookie";

function ProductInfo(props) {
  const [cookies, setCookie, removeCookie, get] = useCookies(["token"]);
  const { title, sellingPrice, description, images, reviews, id, variations } =
    props;
  const [quantity, setQuantity] = useState(1);
  const [currentCartQty, setCurrentCartQty] = useState(null);
  const [rating, setRating] = useState(null);
  const [reviewTitle, setReviewTitle] = useState(null);
  const [reviewBody, setReviewBody] = useState(null);
  const [value4, setValue4] = useState(null);

  // let defaultItems = [];
  // if(localStorage.getItem("items")){
  //     defaultItems = [...JSON.parse(localStorage.getItem("items"))];
  // }

  // const [items,setItems] = useState(localStorage.getItem("items") ? [...JSON.parse(localStorage.getItem("items"))] :[]);
  const loggedInToken = cookies.token;

  // const [wholeCart,setWholeCart] = useState(null);

  // useEffect(()=>{
  //     if(loggedInToken){
  //         axios.get("https://modcrew-dev.herokuapp.com/api/v1/cart",{
  //             headers:{
  //                 'Content-Type':'application/json',
  //                 "Authorization" :`Bearer ${loggedInToken}`
  //             }
  //         },{
  //             withCredentials: true
  //             })
  //         .then((response)=>{
  //             setQuantity(response.data.data.items[0].units);
  //             //console.log("current",response.data.data);
  //         });
  //     }else{
  //         const itemsData = JSON.parse(localStorage.getItem("items"));
  //         const requiredItem = itemsData?.filter((itemsInsides)=>{
  //             return itemsInsides.productId === id;
  //         });
  //         if(requiredItem){
  //             setQuantity(requiredItem.units);
  //         }
  //     }
  // },[])

  // useEffect(()=>{
  //     localStorage.setItem("items",JSON.stringify(items));
  // },[items]);

  function handleChange(event) {
    const newQty = event.target.value;
    const newQtyInt = parseInt(newQty);
    setQuantity(newQtyInt);
  }

  function handleReviewSubmit(e) {
    e.preventDefault();
    axios
      .post(`https://modcrew-dev.herokuapp.com/api/v1/products/${id}/reviews`, {
        rating: rating,
        title: reviewTitle,
        body: reviewBody,
      })
      .then((response) => {
        console.log(response);
      });
    const element = document.getElementById("post-review");
    element.classList.add("d-none");
  }

  function handlePostReviewVisisble() {
    const element = document.getElementById("post-review");
    element.classList.remove("d-none");
  }

  function handlePostReviewHidden() {
    const element = document.getElementById("post-review");
    element.classList.add("d-none");
  }

  async function handleAddToCartBtn(e) {
    if (loggedInToken) {
      // getting cart
      const response = await axios.get(
        "https://modcrew-dev.herokuapp.com/api/v1/cart",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInToken}`,
          },
        },
        {
          withCredentials: true,
        },
      );

      let items = response.data.data.items;
      console.log("local cart before doin anything", items);
      if (items?.length === 0) {
        axios
          .post(
            "https://modcrew-dev.herokuapp.com/api/v1/cart",
            {
              items: [
                {
                  productId: id,
                  sku: variations[0].sku,
                  units: quantity,
                },
              ],
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loggedInToken}`,
              },
            },
            {
              withCredentials: true,
            },
          )
          .then((response) => {
            console.log("product added to cart");
          });
      } else {
        console.log("inside else block before filter", items);
        items = items?.filter((item) => {
          if (item.productId !== id) {
            return item;
          }
        });
        console.log("inside else block before push", items);
        items?.push({
          productId: id,
          sku: variations[0].sku,
          units: quantity,
        });
        console.log("inside else block after push", items);
        axios
          .post(
            "https://modcrew-dev.herokuapp.com/api/v1/cart",
            {
              items,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loggedInToken}`,
              },
            },
            {
              withCredentials: true,
            },
          )
          .then((response) => {
            console.log("product added to cart");
          });
      }
    } else {
      window.location.href = "../login";
    }
    const element = e.target;
    element.classList.add("added-to-cart");
    element.innerHTML = "Added to cart";
  }

  // async function handleAddToCartBtn() {
  // 	if (!loggedInToken) {
  // 		window.location.href = '../login'
  // 	}

  // 	const response = await axios.get(
  // 		'https://modcrew-dev.herokuapp.com/api/v1/cart',
  // 		{
  // 			headers: {
  // 				'Content-Type': 'application/json',
  // 				Authorization: `Bearer ${loggedInToken}`
  // 			}
  // 		}
  // 	)

  // 	let items = response.data.data.items

  // 	if (items.length === 0) {
  // 		const res = await axios.post(
  // 			'https://modcrew-dev.herokuapp.com/api/v1/cart',
  // 			{
  // 				items: [
  // 					{
  // 						productId: id,
  // 						sku: variations[0].sku,
  // 						units: quantity
  // 					}
  // 				]
  // 			},
  // 			{
  // 				headers: {
  // 					'Content-Type': 'application/json',
  // 					Authorization: `Bearer ${loggedInToken}`
  // 				}
  // 			}
  // 		)

  // 		items = res.data.data.items
  // 	} else {
  // 		// items = items.filter((item) => {
  // 		// 	if (item.productId !== id) {
  // 		// 		// console.log("same item",item);
  // 		// 		return item
  // 		// 	}
  // 		// })

  // 		items = items.filter((item) => item.productId !== id)

  // 		const idx = items.findIndex((item) => item.productId === id)

  // 		items[idx].sku = variations[0].sku;
  // 		items[idx].sku = quantity;

  // 		// // console.log("before pushing",items);
  // 		// items.push({
  // 		// 	productId: id,
  // 		// 	sku: variations[0].sku,
  // 		// 	units: quantity
  // 		// })

  // 		// console.log("after pushing",items);
  // 		const data = await axios.post(
  // 			'https://modcrew-dev.herokuapp.com/api/v1/cart',
  // 			{
  // 				items
  // 			},
  // 			{
  // 				headers: {
  // 					'Content-Type': 'application/json',
  // 					Authorization: `Bearer ${loggedInToken}`
  // 				}
  // 			}
  // 		)

  // 		items = data.data.data.items
  // 	}
  // }

  // const options = [
  //   {
  //     label: "Size 01",
  //     value: "Size 01",
  //     label: "Size 02",
  //     value: "Size 02s",
  //     label: "Size 03",
  //     value: "Size 03",
  //   },
  // ];

  // var onChange4 = (e) => {
  //   console.log("radio4 checked", e.target.value);
  //   // this.setState({
  //   setValue4(e.target.value);
  //   // });
  // };

  return (
    <div className="product-info">
      <span className="title">{title}</span>
      <span className="selling-price">₹{sellingPrice}/-</span>
      <div className="prodctInfoPage-btns">
        <span className="productsize-btns">
          {/* <Radio.Group
            className="productsize-btn"
            options={options}
            onChange={onChange4}
            // value={value4}
            optionType="button"
            buttonStyle="solid"
          >
            Size 01
          </Radio.Group> */}
          <button className="productsize-btn default-size">Small (S)</button>
          <button className="productsize-btn">Medium (M)</button>
          <button className="productsize-btn">Large (L)</button>
        </span>
        <span className="productcolours">
          <button className="productcolour-btn-1"></button>
          <button className="productcolour-btn-2"></button>
          <button className="productcolour-btn-3"></button>
        </span>
        <span className="qty-sold">900 sold</span>
      </div>
      <p className="product-description">{description}</p>
      <span>
        <button
          className="productInfo-qty-btns"
          onClick={() => {
            if (quantity > 0) setQuantity(quantity - 1);
          }}
        >
          -
        </button>
        <input
          className="productInfo-product-qty"
          value={quantity}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <button
          className="productInfo-qty-btns"
          onClick={() => {
            if (quantity < 10) setQuantity(quantity + 1);
          }}
        >
          +
        </button>
        <button
          onClick={(e) => {
            handleAddToCartBtn(e);
          }}
          className="add-to-cart"
        >
          Add to Cart
        </button>
      </span>
      <br />
      <span className="comment-review-social">
        <button
          onClick={() => {
            handlePostReviewHidden();
          }}
          className="comments"
        >
          Comments({reviews?.length})
        </button>
        <button
          onClick={() => {
            handlePostReviewVisisble();
          }}
          className="review"
        >
          Post a review
        </button>
        <span className="productPage-social-tray">
          Share this:
          <button className="productPage-social-icons">
            <TiAttachmentOutline size={25} className="white-color" />
          </button>
          <button className="productPage-social-icons">
            <AiOutlineGoogle size={25} className="white-color" />
          </button>
          <button className="productPage-social-icons">
            <FaFacebookF size={25} className="white-color" />
          </button>
          <button className="productPage-social-icons">
            <RiTwitterFill size={25} className="white-color" />
          </button>
        </span>
      </span>
      <hr />
      <div className="d-none" id="post-review">
        <form>
          Rating:
          <Rate
            // onChange={(e) => {
            //   setRating(e.target.value);
            // }}
            style={{
              backgroundColor: "#E0E0E0",
              margin: "10px",
            }}
            type="number"
          />
          <Input
            onChange={(e) => {
              setReviewTitle(e.target.value);
            }}
            type="text"
            placeholder="Title"
            style={{ width: "200px", marginRight: "10px" }}
          />
          <Input
            onChange={(e) => {
              setReviewBody(e.target.value);
            }}
            type="text"
            placeholder="Write your review here"
            style={{ width: "300px", marginRight: "10px" }}
          />
          <Button
            onClick={(e) => {
              handleReviewSubmit(e);
            }}
            type="submit"
            style={{ backgroundColor: "lightgreen", color: "black" }}
          >
            Submit
          </Button>
          {/* <input
            onChange={(e) => {
              setReviewTitle(e.target.value);
            }}
            type="text"
            placeholder="Title"
          ></input> */}
          {/* <input
            onChange={(e) => {
              setReviewBody(e.target.value);
            }}
            type="text"
            placeholder="Write your review here"
          ></input> */}
          {/* <button
            onClick={(e) => {
              handleReviewSubmit(e);
            }}
            type="submit"
          >
            Submit Review
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default ProductInfo;
