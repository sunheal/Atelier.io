import React from "react";
import Modal from "react-modal";
import { FaStar } from "react-icons/fa";
import config from "../../../../config";
import axios from "axios";
import "../Ratings&Reviews/rr.css";


const initialState = {
  name: "",
  rating: 0,
  sizePt: 0,
  comfortPt: 0,
  recommend: null,
  imageURLs: [],
  summary: "",
  body: "",
  email: "",
  sizeId: "",
  comfortId: "",
};

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.state.verified = true;
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onSizeChange = this.onSizeChange.bind(this);
    this.onComfortChange = this.onComfortChange.bind(this);
    this.onImagefileChange = this.onImagefileChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.recommendChange = this.recommendChange.bind(this);
    this.revSum = this.revSum.bind(this);
    this.revBody = this.revBody.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //find out the character id of this product and set them to the state to see if size and comfort exist
    axios.get(`/reviews/meta/?product_id=${this.props.id}`).then((output) => {
      //  console.log(output, 'metaaaa')
      let characteristics = output.data.characteristics;
      for (var charc in characteristics) {
        if (charc === "Size") {
          this.setState({
            sizeId: characteristics[charc].id,
          });
        }
        if (charc === "Comfort") {
          this.setState({
            comfortId: characteristics[charc].id,
          });
        }
      }
    });
  }

  emailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }
  recommendChange(event) {
    if (event.target.value === "true") {
      this.setState({
        recommend: true,
      });
    } else {
      this.setState({
        recommend: false,
      });
    }
  }
  nameChange(event) {
    this.setState({
      name: event.target.value,
    });
  }
  revBody(event) {
    this.setState({
      body: event.target.value,
    });
  }
  revSum(event) {
    this.setState({
      summary: event.target.value,
    });
  }
  onRatingChange(event) {
    this.setState({
      rating: event.target.value,
    });
  }
  // need to find the characteristic id and pass params like this: characteristic:{'characteristic_id':3}
  onSizeChange(event) {
    this.setState({
      sizePt: event.target.value,
    });
  }
  onComfortChange(event) {
    this.setState({
      comfortPt: event.target.value,
    });
  }
  onImagefileChange(event) {
    const files = event.target.files[0];
    var form = new FormData();
    form.append("image", files);
    // console.log(form, 'src photo');
    let options = {
      url: `https://api.imgbb.com/1/upload?key=${config.imgbbToken}`,
      method: "POST",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form,
    };
    axios(options)
      .then((output) => {
        let imgURL = output.data.data.display_url;
        //   console.log(imgURL, 'stream from imgbb');
        let urlArr = this.state.imageURLs.concat(imgURL);
        this.setState({
          imageURLs: urlArr,
        });
      })
      .catch((err) => console.log(err));
  }

  verify(element) {
    for (let item in element) {
      if (element[item] === null || element[item] === '' || element[item] === 0) {
        return false;
      }
    }
    return true;
  }

  handleSubmit(event) {
    // console.log('why is not running');
    event.preventDefault();
    let toSend = {
      product_id: this.props.id,
      rating: Number(this.state.rating),
      recommend: this.state.recommend,
      summary: this.state.summary,
      body: this.state.body,
      name: this.state.name,
      email: this.state.email,
      photos: this.state.imageURLs,
      characteristics: {},
    };
    if (this.state.sizeId !== "") {
      let temp = this.state.sizeId.toString();
      toSend.characteristics[temp] = Number(this.state.sizePt);
    }
    if (this.state.comfortId !== "") {
      let temp = this.state.comfortId.toString();
      toSend.characteristics[temp] = Number(this.state.comfortPt);
      console.log(toSend);
      console.log(JSON.stringify(toSend), "json");
    }
    // toSend.product_id = this.props.id;
    // console.log(toSend, 'send to post review');
    if (this.verify(toSend)) {
      console.log(this.verify(toSend), 'yesss')
      axios
        .post("/reviews", toSend)
        .then((res) => {
          this.props.updateReviewAfterSubmit();
          console.log("successed", res)
        })
        .catch((err) => console.log(err));
      this.props.onShowModal();
    } else {
      window.alert('no')
    };
  }

  render() {
    return (
      <div className="reviewModal">
        <Modal
          className="innerModal"
          isOpen={this.props.show}
          ariaHideApp={false}
        >
          <h1> Add Your Review </h1>
          <form>
            <label name="AddReview_Name">
              {" "}
              Name:
              <input type="text" onChange={this.nameChange} required />
            </label>
            <br></br>
            <label>
              {" "}
              Do you recommend this product?:
              <input
                name="recommend"
                type="radio"
                value="true"
                onClick={this.recommendChange}
                required
              />{" "}
              Yes
              <input
                name="recommend"
                type="radio"
                value="false"
                onClick={this.recommendChange}
              />{" "}
              No
            </label>
            <br></br>
            <label name="rating">
              {" "}
              Overall Rating:
              {[...Array(5)].map((star, i) => {
                const ratingVal = i + 1;

                return (
                  <a key={ratingVal}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingVal}
                      //   key={ratingVal}
                      onClick={this.onRatingChange}
                      required
                    />
                    <FaStar
                      className="star"
                      size="20"
                      //   key={ratingVal}
                      color={ratingVal <= this.state.rating ? "gold" : "white"}
                    />
                  </a>
                );
              })}
            </label>
            <br></br>
            <a name="ratingtxt">
              {" "}
              {this.state.rating > 0 ? (
                <p>
                  {" "}
                  1 star - “Poor” 2 stars - “Fair” 3 stars - “Average” 4 stars -
                  “Good” 5 stars - “Great”{" "}
                </p>
              ) : null}{" "}
            </a>
            <br></br>
            <label>
              {" "}
              How do you like the size?:
              <input
                name="PRSize"
                type="radio"
                value="1"
                onClick={this.onSizeChange}
              />{" "}
              1
              <input
                name="PRSize"
                type="radio"
                value="2"
                onClick={this.onSizeChange}
              />{" "}
              2
              <input
                name="PRSize"
                type="radio"
                value="3"
                onClick={this.onSizeChange}
              />{" "}
              3
              <input
                name="PRSize"
                type="radio"
                value="4"
                onClick={this.onSizeChange}
              />{" "}
              4
              <input
                name="PRSize"
                type="radio"
                value="5"
                onClick={this.onSizeChange}
              />{" "}
              5
            </label>
            <br></br>
            <a name="sizetxt">
              {" "}
              {this.state.sizePt > 0 ? (
                <p>
                  {" "}
                  1 star - “A size too small” 2 stars - “½ a size too small” 3
                  stars - “Perfect” 4 stars - “½ a size too big” 5 stars - “A
                  size too wide”
                </p>
              ) : null}
            </a>
            <br></br>
            <label>
              {" "}
              How do you like the comfortness?:
              <input
                name="PRComfort"
                type="radio"
                value="1"
                onClick={this.onComfortChange}
              />{" "}
              1
              <input
                name="PRComfort"
                type="radio"
                value="2"
                onClick={this.onComfortChange}
              />{" "}
              2
              <input
                name="PRComfort"
                type="radio"
                value="3"
                onClick={this.onComfortChange}
              />{" "}
              3
              <input
                name="PRComfort"
                type="radio"
                value="4"
                onClick={this.onComfortChange}
              />{" "}
              4
              <input
                name="PRComfort"
                type="radio"
                value="5"
                onClick={this.onComfortChange}
              />{" "}
              5
            </label>
            <br></br>
            <a name="comforttxt">
              {" "}
              {this.state.comfortPt > 0 ? (
                <p>
                  {" "}
                  1 star - “Uncomfortable” 2 stars - “Slightly uncomfortable” 3
                  stars - “Ok” 4 stars - “Comfortable” 5 stars - “Perfect”
                </p>
              ) : null}
            </a>
            <br></br>
            <label>
              {" "}
              Review Summary:
              <textarea
                rows="4"
                cols="50"
                maxLength="60"
                value={this.state.summary}
                onChange={this.revSum}
              />
            </label>
            <br></br>
            <label>
              {" "}
              Review Body:
              <textarea
                rows="4"
                cols="50"
                maxLength="1000"
                value={this.state.body}
                onChange={this.revBody}
                required
              />
            </label>
            <br></br>
            <label>
              {" "}
              Upload Photo:
              <input type="file" onChange={this.onImagefileChange} />
              {/* <button onClick={this.onImagefileChange}> Upload </button>  */}
            </label>{" "}
            <br></br>
            <label>
              {" "}
              Email Address:
              <input
                type="email"
                value={this.state.email}
                onChange={this.emailChange}
                required
              />
            </label>
            <br></br>
            <input type="submit" onClick={this.handleSubmit} />
          </form>
          <button onClick={this.props.onShowModal}> Close </button>
        </Modal>
      </div>
    );
  }
}

export default AddReview;
