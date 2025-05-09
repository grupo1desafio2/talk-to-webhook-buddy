
import Chatbot from '../components/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Grupo eSales</h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Bem-vindo ao nosso site</h2>
                <p className="text-gray-600 mb-4">Clique no botão de chat no canto inferior direito para conversar conosco.</p>
                <p className="text-sm text-gray-400">Conectado ao webhook: n8n.grupoesales.com.br</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Chatbot component */}
      <Chatbot />
    </div>
  );
};

export default Index;
