import { NProgress } from '@tanem/react-nprogress'
import React from 'react'
import Bar from './Bar'
import Container from './Container'
import './index.css'

const nprogress = (props) => (
    <NProgress isAnimating={props.isLoading} >
        {({ isFinished, progress, animationDuration }) => (
            <Container
                isFinished={isFinished}
                animationDuration={animationDuration}
            >
                <Bar
                    progress={progress}
                    animationDuration={animationDuration}
                />

            </Container>
        )}
    </NProgress>
)

export default nprogress