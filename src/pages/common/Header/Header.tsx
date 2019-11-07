import React from 'react'
import { Flex } from 'rebass/styled-components'
import styled from 'styled-components'
import Profile from 'src/pages/common/Header/Menu/Profile/Profile'
import MenuDesktop from 'src/pages/common/Header/Menu/MenuDesktop'
import MenuMobilePanel from 'src/pages/common/Header/Menu/MenuMobile/MenuMobilePanel'
import posed, { PoseGroup } from 'react-pose'
import { Frame, AnimatePresence } from 'framer'
import Logo from 'src/pages/common/Header/Menu/Logo/Logo'
import theme from 'src/themes/styled.theme'
import HamburgerMenu from 'react-hamburger-menu'
import { observer, inject } from 'mobx-react'
import { MobileMenuStore } from 'src/stores/MobileMenu/mobilemenu.store'

interface IProps {}

interface IInjectedProps extends IProps {
  mobileMenuStore: MobileMenuStore
}

const MobileMenuWrapper = styled(Flex)`
  /* position: relative; */

  @media only screen and (max-width: ${theme.breakpoints[1]}) {
    display: flex;
  }

  @media only screen and (min-width: ${theme.breakpoints[1]}) {
    display: none;
  }
`
const DesktopMenuWrapper = styled(Flex)`
  position: relative;

  @media only screen and (max-width: ${theme.breakpoints[1]}) {
    display: none;
  }

  @media only screen and (min-width: ${theme.breakpoints[1]}) {
    display: flex;
  }
`

// const AnimationContainer = posed.div({
//   enter: {
//     duration: 250,
//     position: 'relative',
//     top: '0',
//   },
//   exit: {
//     duration: 250,
//     position: 'relative',
//     top: '-100%',
//   },
// })

const variants = {
  open: { y: 0 },
  closed: { y: 0 },
}

@inject('mobileMenuStore')
@observer
export class Header extends React.Component<IProps> {
  constructor(props: any) {
    super(props)
  }

  get injected() {
    return this.props as IInjectedProps
  }

  render() {
    const menu = this.injected.mobileMenuStore
    return (
      <>
        <Flex
          data-cy="header"
          bg="white"
          justifyContent="space-between"
          alignItems="center"
          pl={[4, 4, 0]}
          pr={[4, 4, 0]}
          sx={{ zIndex: 9999, position: 'relative' }}
        >
          <Flex>
            <Logo isMobile={true} />
          </Flex>
          <DesktopMenuWrapper className="menu-desktop" px={2}>
            <MenuDesktop />
            <Profile isMobile={false} />
          </DesktopMenuWrapper>
          <MobileMenuWrapper className="menu-mobile">
            <Flex px={5}>
              <HamburgerMenu
                isOpen={menu.showMobilePanel || false}
                menuClicked={() => menu.toggleMobilePanel()}
                width={18}
                height={15}
                strokeWidth={1}
                rotate={0}
                color="black"
                borderRadius={0}
                animationDuration={0.3}
              />
            </Flex>
          </MobileMenuWrapper>
        </Flex>
        {console.log('c', menu.showMobilePanel)}
        <AnimatePresence>
          {menu.showMobilePanel && (
            <Frame
              initial={{ top: '-100%' }}
              animate={{ top: '0' }}
              exit={{ top: '-100%' }}
              height={'100%'}
              width={'100%'}
              position={'relative'}
            >
              <MobileMenuWrapper>
                <MenuMobilePanel />
              </MobileMenuWrapper>
            </Frame>
          )}
        </AnimatePresence>
        {/* <motion.div
          animate={menu.showMobilePanel ? 'open' : 'closed'}
          variants={variants}
          transition={{ duration: 1 }}
        > */}
        {/* {menu.showMobilePanel && ( */}

        {/* )} */}
        {/* </motion.div> */}
      </>
    )
  }
}

export default Header
