import React, {FC} from 'react';
import {Modal, View} from 'react-native';
import {styles} from './styles';

type StockModalProps = {
  modalVisible: boolean;
  children: React.ReactNode;
};

const StockModal: FC<StockModalProps> = ({
  modalVisible,
  children,
}) => {

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default StockModal;
