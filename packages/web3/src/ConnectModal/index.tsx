import React from 'react';
import { Modal } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import ModalPanel from './components/modalPanel';
import { ConfigContext } from 'antd/es/config-provider';
import useStyle from './style';
import classNames from 'classnames';
import type { ConnectModalProps, PanelRoute, Wallet } from './interface';
import { ConnectModalContextProvider } from './context';


export const ConnectModal: React.FC<ConnectModalProps> = (props) => {
  const {
    open,
    onOpenChange,
    modalProps,
    prefixCls: customizePrefixCls,
    guide,
    onSelectWallet,
  } = props;
  const {
    getPrefixCls,
  } = React.useContext(ConfigContext);
  const [selectedWallet, setSelectedWallet] = React.useState<Wallet>();
  const [panelRoute, setPanelRoute] = React.useState<PanelRoute>('guide');
  const routeStack = React.useRef<PanelRoute[]>(['guide']);
  const prefixCls = getPrefixCls('connect-modal', customizePrefixCls);
  const updatePanelRoute = React.useCallback((route: PanelRoute, clear: boolean = false) => {
    if (clear) {
      routeStack.current = ['guide'];
    }
    setPanelRoute(route);
    routeStack.current.push(route);
  }, []);
  const updateSelectedWallet = React.useCallback((wallet: Wallet | undefined) => {
    setSelectedWallet(wallet);
    if (wallet) {
      onSelectWallet?.(wallet);
    }
  }, [onSelectWallet]);
  const panelRouteBack = React.useCallback(() => {
    routeStack.current.pop();
    const route = routeStack.current[routeStack.current.length - 1];
    setPanelRoute(route);
  }, []);

  // Style
  const [wrapSSR] = useStyle(prefixCls);


  return (
    <ConnectModalContextProvider value={{
      prefixCls,
      selectedWallet,
      updateSelectedWallet,
      panelRoute,
      updatePanelRoute,
      panelRouteBack,
      canBack: routeStack.current.length > 1,
    }}>
      {
        wrapSSR(
          <Modal
            {...modalProps}
            width={guide ? 737 : 380}
            maskClosable={false}
            className={classNames(prefixCls)}
            rootClassName={`${prefixCls}-root`}
            open={open}
            closeIcon={<CloseCircleFilled />}
            onCancel={() => {
              onOpenChange?.(false);
            }}
            footer={null}
          >
            <ModalPanel {...props} prefixCls={prefixCls} />
          </Modal>
        )
      }
    </ConnectModalContextProvider>
  );
};
ConnectModal.displayName = 'ConnectModal';
