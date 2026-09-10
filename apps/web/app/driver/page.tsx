'use client'

import { useState } from 'react'
import { Phone, Mic, MapPin, Navigation, Volume2 } from 'lucide-react'

export default function DriverPage() {
  const [isListening, setIsListening] = useState(false)
  const [urduText, setUrduText] = useState('')

  const quickActions = [
    { icon: Navigation, label: 'Start Route', labelUrdu: 'راستہ شروع کریں', action: 'start' },
    { icon: MapPin, label: 'Current Location', labelUrdu: 'موجودہ مقام', action: 'location' },
    { icon: Phone, label: 'Call Support', labelUrdu: 'سپورٹ کال کریں', action: 'call' },
    { icon: Volume2, label: 'Voice Command', labelUrdu: 'آواز کا حکم', action: 'voice', toggle: true },
  ]

  const currentRoute = {
    from: 'Lahore',
    to: 'Karachi',
    distance: '1,200 km',
    eta: '14 hours',
    nextStop: 'Multan (150 km)',
  }

  const handleVoiceCommand = () => {
    setIsListening(!isListening)
    // In production: integrate Web Speech API with Urdu language support
    if (!isListening) {
      setUrduText('سن رہا ہوں...')
    } else {
      setUrduText('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-green-600 p-6">
        <h1 className="text-2xl font-bold">Driver Mode / ڈرائیور موڈ</h1>
        <p className="mt-1 text-green-100">Mobile-optimized interface for drivers</p>
      </div>

      {/* Current Route Card */}
      <div className="p-4">
        <div className="rounded-lg bg-gray-800 p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">Current Route / موجودہ راستہ</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">From / سے:</span>
              <span className="font-medium">{currentRoute.from}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">To / کو:</span>
              <span className="font-medium">{currentRoute.to}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Distance / فاصلہ:</span>
              <span className="font-medium">{currentRoute.distance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ETA:</span>
              <span className="font-medium">{currentRoute.eta}</span>
            </div>
            <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
              <span className="text-gray-400">Next Stop / اگلا اسٹاپ:</span>
              <span className="font-medium text-green-400">{currentRoute.nextStop}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions - Large touch-friendly buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {quickActions.map((action) => (
            <button
              key={action.action}
              onClick={action.toggle ? handleVoiceCommand : undefined}
              className={`flex flex-col items-center justify-center p-6 rounded-lg transition-all active:scale-95 ${
                action.toggle && isListening
                  ? 'bg-red-600 animate-pulse'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <action.icon className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">{action.label}</span>
              <span className="text-xs text-gray-400 mt-1 font-urdu">{action.labelUrdu}</span>
            </button>
          ))}
        </div>

        {/* Voice Command Status */}
        {isListening && (
          <div className="rounded-lg bg-red-900/50 p-4 mb-4 border border-red-700">
            <div className="flex items-center gap-3">
              <Mic className="h-6 w-6 text-red-400 animate-pulse" />
              <div>
                <p className="font-medium">Listening... / سن رہا ہوں</p>
                {urduText && <p className="text-sm text-gray-400 font-urdu mt-1">{urduText}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Offline Status */}
        <div className="rounded-lg bg-yellow-900/30 p-4 border border-yellow-700">
          <p className="text-sm text-yellow-200">
            ⚠️ Offline mode active / آف لائن موڈ فعال
          </p>
          <p className="text-xs text-yellow-400 mt-1">
            Data will sync when connection is restored
          </p>
        </div>
      </div>

      {/* Bottom Navigation Hint */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 text-center text-xs text-gray-400 mobile-safe-area">
        <p>Tap buttons for voice commands in Urdu / اردو میں آواز کے احکامات کے لیے بٹن دبائیں</p>
      </div>
    </div>
  )
}
