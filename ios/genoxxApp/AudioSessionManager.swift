import Foundation
import AVFoundation

@objc(AudioSessionManager)
class AudioSessionManager: NSObject {
  
  @objc(AudioSessionManager)
  class AudioSessionManager: NSObject {
    @objc
    static func activateSession() {
      do {
        try AVAudioSession.sharedInstance().setCategory(.playAndRecord, mode: .default)
        try AVAudioSession.sharedInstance().setActive(true)
      } catch {
        print("Error al activar AVAudioSession: \(error)")
      }
    }
  }
}
