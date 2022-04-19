import React from "react"


  class BarChart extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            totalRating: 0,
        }
    }


    render() {
        // console.log(this.props.meta, 'inside barchart')
        // const characObj = this.props.meta.characteristics;
        const aa = 30;
        return (
            <div>
            <p> {this.props.recommend}% of reviews recommended this product</p>
                <div className="starBreakDown_RR">
                {[...Array(5)].map((bar, index)=>{
                    const order = 5 - (index);
                    // console.log(this.props.ratings)
                    return (
                        <svg height='30' width="300" key={order}>
                            <text className="name-label" x="0" y="15">{order} Stars</text>
                            <rect className='grey' width='100' height='10' x='90' y='5'fill="grey" opacity='0.25'/>
                          {this.props.ratings[order] ? <rect className='green' width={((this.props.ratings[order]/this.props.count)*100).toString()} height='10'  x='90' y='5' fill="green" /> : null}
                        </svg>
                    )
                })}
                </div>
                {!this.props.meta.characteristics  ? null: (!this.props.meta.characteristics.Size ? null :
                <svg width='300' height='80'>
                <text className="charcteristic-label" x='0' y='15'> Size </text>
                <polygon points="0,0 10,0 5,10" transform={`translate(${this.props.meta.characteristics.Size.value/5*100} 25)`}/>
                <rect className='grey' width='75' height='10' x='0' y='30'fill="grey" opacity='0.25'/>
                <rect className='grey' width='75' height='10' x='80' y='30'fill="grey" opacity='0.25'/>
                <rect className='grey' width='75' height='10' x='160' y='30'fill="grey" opacity='0.25'/>
                <text className="charcteristic-metric" x='8' y='55' fontSize='small'> Too Small </text>
                <text className="charcteristic-metric" x='95' y='55' fontSize='small'> Perfect </text>
                <text className="charcteristic-metric" x='168' y='55' fontSize='small'> Too Large </text>
                </svg>
                )
                }

              {!this.props.meta.characteristics  ? null: (!this.props.meta.characteristics.Comfort ? null :
                <svg width='300' height='80'>
                <text className="charcteristic-label" x='0' y='15'> Comfort </text>
                <polygon points="0,0 10,0 5,10" transform={`translate(${this.props.meta.characteristics.Comfort.value/5*100} 25)`}/>
                <rect className='grey' width='75' height='10' x='0' y='30'fill="grey" opacity='0.25'/>
                <rect className='grey' width='75' height='10' x='80' y='30'fill="grey" opacity='0.25'/>
                <rect className='grey' width='75' height='10' x='160' y='30'fill="grey" opacity='0.25'/>
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