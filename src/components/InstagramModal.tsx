interface InstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function InstagramModal({ isOpen, onClose, onConfirm }: InstagramModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Confirmar Follow no Instagram
        </h3>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            Para ver seu plano alimentar completo, confirme que você:
          </p>
          
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Seguiu @dgsolutionweb no Instagram</li>
            <li>Deixou um like em nossa última publicação</li>
          </ol>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 text-sm">
              Seu plano nutricional completo será liberado após a confirmação.
            </p>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ainda não segui
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2 px-4 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Já segui!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 