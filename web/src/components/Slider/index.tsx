import classnames from 'classnames';
import * as React from 'react';
import { LeftArrowIcon, RightArrowIcon } from '../../assets/images/slider';

interface State {
    dragStart: number;
    dragStartTime: Date;
    index: number;
    lastIndex: number;
    transition: boolean;
    slideWidth: number;
}

export interface SliderProps {
    loop: boolean;
    selected: number;
    showArrows: boolean;
    children: any;
    onChanged?: (index: number) => void;
    slideWidthPercent?: number;
    firstSlideWitdhPercent?: number;
}

const DEFAULT_SLIDE_WIDTH_PERCENT = 100;

export class Slider extends React.Component<SliderProps, State> {
    constructor(props: SliderProps) {
        super(props);

        this.state = {
            dragStart: 0,
            dragStartTime: new Date(),
            index: 0,
            lastIndex: 0,
            transition: false,
            slideWidth: 0,
        };
    }

    private sliderRef = React.createRef<HTMLDivElement>();

    public componentDidMount() {
        const { selected } = this.props;

        this.setState({
          index: selected,
          lastIndex: selected,
        });
    }

    public componentWillReceiveProps(nextProps) {
        const { selected } = this.props;

        if (selected !== nextProps.selected) {
            this.goToSlide(nextProps.selected);
        }
    }

    public render() {
        const { children, showArrows, loop } = this.props;
        const { transition, lastIndex } = this.state;

        const slidesClasses = classnames('cr-slider-slides', {
            'cr-slider-slides--transition': transition,
        });
    
        const leftArrowDisabledClassName = classnames('cr-slider-arrow--left', {
            'cr-slider-arrow--disabled': lastIndex <= 0 && !loop,
        });

        const rightArrowDisabledClassName = classnames('cr-slider-arrow--right', {
            'cr-slider-arrow--disabled': lastIndex >= children.length - 1 && !loop,
        });

        return (
            <div className="slider">
                {loop || showArrows ?
                    <div className={leftArrowDisabledClassName} onClick={e => this.goToSlide(lastIndex - 1, e)}>
                        <LeftArrowIcon />
                    </div> : null}
                    <div className="cr-slider" ref={this.sliderRef}>
                        <div
                            className="cr-slider-innner"
                            onTouchStart={e => this.handleDragStart(e, true)}
                            onTouchMove={e => this.handleDragMove(e, true)}
                            onTouchEnd={() => this.handleDragEnd()}>
                                <div
                                    className={slidesClasses}
                                    style={this.sliderStyles()}>
                                    {children}
                                </div>
                        </div>
                        </div>
                    {loop || showArrows ?
                    <div className={rightArrowDisabledClassName} onClick={e => this.goToSlide(lastIndex + 1, e)}>
                        <RightArrowIcon />
                    </div> : null}
            </div>
        );
    }

    private sliderStyles = () => {
        const { index } = this.state;
        const { children, slideWidthPercent, firstSlideWitdhPercent } = this.props;

        let sliderWidth;
        let sliderTransform;

        if (index < 1) {
            sliderWidth = children.length * (firstSlideWitdhPercent || DEFAULT_SLIDE_WIDTH_PERCENT);
            sliderTransform = ((firstSlideWitdhPercent || DEFAULT_SLIDE_WIDTH_PERCENT) / children.length) * index * -1;
        } else {
            sliderWidth = children.length * (slideWidthPercent || DEFAULT_SLIDE_WIDTH_PERCENT);
            sliderTransform = ((slideWidthPercent || DEFAULT_SLIDE_WIDTH_PERCENT) / children.length) * index * -1;
        }

        return {
            width: `${sliderWidth}%`,
            transform: `translateX(${sliderTransform}%)`,
        };
    };

    private getDragX = (e, isTouch: boolean) => (isTouch ? e.touches[0].pageX : e.pageX);

    private handleDragStart = (e, isTouch: boolean) => {
        const x = this.getDragX(e, isTouch);

        this.setState({
            dragStart: x,
            dragStartTime: new Date(),
            transition: false,
            slideWidth: this.sliderRef.current ? this.sliderRef.current.offsetWidth : 0,
        });
    };

    private handleDragMove = (e, isTouch: boolean) => {
        const {
            dragStart,
            lastIndex,
            slideWidth,
        } = this.state;

        const x = this.getDragX(e, isTouch);
        const offset = dragStart - x;
        const percentageOffset = offset / slideWidth;
        const newIndex = lastIndex + percentageOffset;
        const SCROLL_OFFSET_TO_STOP_SCROLL = 30;

        if (Math.abs(offset) > SCROLL_OFFSET_TO_STOP_SCROLL) {
            e.stopPropagation();
        }

        this.setState({
            index: newIndex,
        });
    };

    private handleDragEnd = () => {
        const { children, onChanged } = this.props;
        const { dragStartTime, index, lastIndex } = this.state;

        const timeElapsed = new Date().getTime() - dragStartTime.getTime();
        const offset = lastIndex - index;
        const velocity = Math.round(offset / timeElapsed * 10000);

        let newIndex = Math.round(index);

        if (Math.abs(velocity) > 5) {
            newIndex = velocity < 0 ? lastIndex + 1 : lastIndex - 1;
        }

        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= children.length) {
            newIndex = children.length - 1;
        }

        this.setState({
            dragStart: 0,
            index: newIndex,
            lastIndex: newIndex,
            transition: true,
        });

        onChanged && onChanged(newIndex);
    };

    private goToSlide = (index: number, e?) => {
        const { children, loop, onChanged } = this.props;

        let newIndex = index;

        if (e) {
            e.stopPropagation();
        }

        if (index < 0) {
            newIndex = loop ? children.length - 1 : 0;
        } else if (index >= children.length) {
            newIndex = loop ? 0 : children.length - 1;
        }

        this.setState({
            index: newIndex,
            lastIndex: newIndex,
            transition: true,
        });

        onChanged && onChanged(newIndex);
    };
}
