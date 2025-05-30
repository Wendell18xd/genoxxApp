import Foundation
import AVFoundation

@objc(AudioSessionManager)
class AudioSessionManager: NSObject {

  @objc
  func activateSession() {
    do {
      let session = AVAudioSession.sharedInstance()
      try session.setCategory(.playAndRecord, mode: .default, options: [.defaultToSpeaker])
      try session.setActive(true)
      print("✅ Sesión de audio activada")
    } catch {
      print("❌ Error al activar sesión de audio: \(error)")
    }
  }
}
