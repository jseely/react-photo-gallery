import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface GalleryProps {
  photos: Photo[];
  cols?: number;
  onClickPhoto?: Function;
  margin?: number;
}

export interface GalleryState {
  containerWidth: number;
}

export interface Photo {
  src: string;
  srcset?: string[];
  sizes?: string[];
  width: number;
  height: number;
  alt?: string;
}

export class Gallery extends React.Component<GalleryProps, any>{
  constructor(){
    super();
    this.state = {
      containerWidth: 0
    };
    this.handleResize = this.handleResize.bind(this);
  }

  public static defaultProps: Partial<GalleryProps> = {
    cols: 3, 
    onClickPhoto: function(k: any, e: any){
	    e.preventDefault();
    },
    margin: 2
  }

  public componentDidMount(){
    this.setState({
      containerWidth: Math.floor(ReactDOM.findDOMNode(this).getBoundingClientRect().width)
    });
    window.addEventListener('resize', this.handleResize);
  }

  public componentDidUpdate(){
    var clientWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width
    if (clientWidth !== this.state.containerWidth){
      this.setState({containerWidth: Math.floor(clientWidth)});
    }
  }

  public componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize, false);
  }

  public handleResize(e: any){
    this.setState({
      containerWidth: Math.floor(ReactDOM.findDOMNode(this).getBoundingClientRect().width)
    });
  }

  render(){
    let cols = this.props.cols,
    photoPreviewNodes = [],
    contWidth = this.state.containerWidth - (cols * (this.props.margin * 2)); 

    contWidth = Math.floor(contWidth); // add some padding to prevent layout prob
    var remainder = this.props.photos.length % cols;
    if (remainder) { // there are fewer photos than cols num in last row
      var lastRowWidth = Math.floor( ((this.state.containerWidth / cols) * remainder) - (remainder * (this.props.margin * 2)) );
      var lastRowIndex = this.props.photos.length - remainder;
    }
    // loop thru each set of  cols num
    // eg. if cols is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
    for (var i=0;i<this.props.photos.length;i+=cols){
      var totalAr=0,
      commonHeight = 0;

      var aspectRatio = []
      // get the total aspect ratio of the row
      for (var j=i; j<i+cols; j++){
        if (j == this.props.photos.length){
          break;
        }
        aspectRatio[j] = this.props.photos[j].width / this.props.photos[j].height;	
        totalAr += aspectRatio[j];
      }
      if (i === lastRowIndex) {
        commonHeight = lastRowWidth / totalAr;
      } else {
        commonHeight = contWidth / totalAr;
      }
      // run thru the same set of items again to give the width and common height
      for (let k=i; k<i+cols; k++){
        if (k == this.props.photos.length){
          break;
        }

        let src = this.props.photos[k].src, srcset, sizes;
        if (this.props.photos[k].srcset){
          srcset = this.props.photos[k].srcset.join();
        }
        if (this.props.photos[k].sizes){
          sizes = this.props.photos[k].sizes.join();
        }

        style.margin = this.props.margin;
        photoPreviewNodes.push(
          <div key={k} style={style}>
            <a href="#" className={String(k)} onClick={(e) => this.props.onClickPhoto(k, e)}>
              <img src={src} srcSet={srcset} sizes={sizes} style={{display:'block', border:0}} height={commonHeight} width={commonHeight * aspectRatio[k]} alt={this.props.photos[k].alt} />
            </a>
          </div>
        );
      }
    }
    return(
      this.renderGallery(photoPreviewNodes)
    );
  }

  private renderGallery(photoPreviewNodes: any){
    return(
      <div id="Gallery" className="clearfix">
        {photoPreviewNodes}
      </div>
    );
  }
};

// Gallery image style
const style = {
   display: 'block',
   backgroundColor:'#e3e3e3',
   float: 'left',
   margin: 0
}
