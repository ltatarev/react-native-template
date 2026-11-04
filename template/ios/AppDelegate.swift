import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  /// Set by `SceneDelegate`. Some native libraries read
  /// `UIApplication.shared.delegate.window`, and raise an exception if the
  /// app delegate does not declare it. It must point at the scene's window.
  var window: UIWindow?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    true
  }
}
