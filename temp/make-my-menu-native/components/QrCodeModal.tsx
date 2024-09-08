import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Modal, Portal, Text, Provider } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function QRCodeModal({
  visible,
  onDismiss,
  link,
}: {
  visible: boolean;
  onDismiss: () => void;
  link: string;
}) {
  const [qrCodeSvg, setQrCodeSvg] = useState<any>(null);

  // Function to share the QR code
  const shareQRCode = async () => {
    if (qrCodeSvg) {
      try {
        // Convert QR code to a Base64 image
        qrCodeSvg.toDataURL(async (dataUrl: string) => {
          const base64Code = dataUrl.split(',')[1];
          const fileUri = `${FileSystem.documentDirectory}qr-code.png`; // Changed to documentDirectory

          // Write the Base64 string as a PNG file
          await FileSystem.writeAsStringAsync(fileUri, base64Code, {
            encoding: FileSystem.EncodingType.Base64,
          });

          // Check if sharing is available and share the QR code
          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(fileUri);
          } else {
            alert('Sharing is not available on this device');
          }
        });
      } catch (error) {
        console.error('Error writing file:', error);
        alert('Error saving QR code. Please try again.');
      }
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
      >
        <Text style={{ marginBottom: 10 }}>Scan this QR Code:</Text>
        <View style={{ alignItems: 'center' }}>
          {link && (
            <QRCode
              value={link}
              size={200}
              getRef={(c) => setQrCodeSvg(c)} // Get the ref to share later
            />
          )}
        </View>

        <Button onPress={onDismiss} style={{ marginTop: 10 }}>
          Close
        </Button>
      </Modal>
    </Portal>
  );
}
