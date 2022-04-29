import React from "react";
import "../Ratings&Reviews/rr.css";



class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            nums: []
        }
        this.onFilterChange = this.onFilterChange.bind(this);
    }
    onFilterChange(event) {
        let temp = event.target[Object.keys(event.target)[1]]
        if (this.state.nums.includes(temp.value)) {
            return;
        } else {
            this.setState({
                nums: this.state.nums.concat(temp.value),
                num: temp.value
            },
                () => {
                    // console.log(temp.value);
                    this.props.filter(this.state.num)
                }
            )
        };

    }


    render() {
        // console.log(this.props, 'meta in barchart')
        return (
            <div>
                {this.props.recommend === 0 ? <p> No Reviews </p> : <p> {this.props.recommend}% of reviews recommended this product</p>}
                <div className="starBreakDown_RR">
                    {Object.keys(this.props.ratings).length === 0 ? null : [...Array(5)].map((bar, index) => {
                        const order = 5 - (index);
                        return (

                                <svg height='30' width="300" key={order}>
                                    <text className="name-label" x="0" y="15">{order} Stars</text>
                                    <rect className='grey' width='100' height='10' x='90' y='5' fill="grey" opacity='0.25' />
                                    <rect className='green' width={(!isNaN(this.props.ratings[order]) && this.props.count) ? ((this.props.ratings[order] / this.props.count) * 100).toString() : '0'} height='10' x='90' y='5' fill="green" value={order} onClick={this.onFilterChange} />
                                </svg>
                                // <svg height='30' width="300" key={order}>
                                //     <text className="name-label" x="0" y="15">{order} Stars</text>
                                //     <rect className='grey' width='100' height='10' x='90' y='5' fill="grey" opacity='0.25' />
                                // </svg>
                        )
                    })}
                </div>
                {!this.props.meta.characteristics ? null : (!this.props.meta.characteristics.Size ? null :
                    <svg width='300' height='80'>
                        <text className="charcteristic-label" x='0' y='15'> Size </text>
                        <polygon points="0,0 10,0 5,10" transform={`translate(${this.props.meta.characteristics.Size.value / 5 * 100} 25)`} />
                        <rect className='grey' width='75' height='10' x='0' y='30' fill="grey" opacity='0.25' />
                        <rect className='grey' width='75' height='10' x='80' y='30' fill="grey" opacity='0.25' />
                        <rect className='grey' width='75' height='10' x='160' y='30' fill="grey" opacity='0.25' />
                        <text className="charcteristic-metric" x='8' y='55' fontSize='small'> Too Small </text>
                        <text className="charcteristic-metric" x='95' y='55' fontSize='small'> Perfect </text>
                        <text className="charcteristic-metric" x='168' y='55' fontSize='small'> Too Large </text>
                    </svg>
                )
                }

                {!this.props.meta.characteristics ? null : (!this.props.meta.characteristics.Comfort ? null :
                    <svg width='300' height='80'>
                        <text className="charcteristic-label" x='0' y='15'> Comfort </text>
                        <polygon points="0,0 10,0 5,10" transform={`translate(${this.props.meta.characteristics.Comfort.value / 5 * 100} 25)`} />
                        <rect className='grey' width='75' height='10' x='0' y='30' fill="grey" opacity='0.25' />
                        <rect className='grey' width='75' height='10' x='80' y='30' fill="grey" opacity='0.25' />
                        <rect className='grey' width='75' height='10' x='160' y='30' fill="grey" opacity='0.25' />
                        <text className="charcteristic-metric" x='25' y='55' fontSize='small'> Poor </text>
                        <text className="charcteristic-metric" x='180' y='55' fontSize='small'> Perfect </text>
                    </svg>
                )
                }
            </div>

        )
    }

}
export default BarChart;