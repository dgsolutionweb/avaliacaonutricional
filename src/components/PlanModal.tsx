import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: string;
}

export function PlanModal({ isOpen, onClose, plan }: PlanModalProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  if (!isOpen) return null;

  const downloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      const doc = new jsPDF();
      
      // Configurar fonte e tamanho
      doc.setFont("helvetica");
      doc.setFontSize(24);
      
      // Título
      doc.setTextColor(44, 62, 80);
      doc.text("Plano Alimentar Personalizado", 20, 30);
      
      // Linha separadora
      doc.setDrawColor(52, 152, 219);
      doc.setLineWidth(0.5);
      doc.line(20, 35, 190, 35);
      
      // Data de geração
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      const dataAtual = new Date().toLocaleDateString('pt-BR');
      doc.text(`Data de geração: ${dataAtual}`, 20, 45);
      
      // Configurar fonte para o conteúdo
      doc.setFontSize(11);
      doc.setTextColor(44, 62, 80);

      // Dividir o conteúdo em seções
      const sections = plan.split('\n\n');
      let yPosition = 55;
      
      for (const section of sections) {
        // Quebrar o texto em linhas para caber na página
        const splitText = doc.splitTextToSize(section, 170);
        
        // Verificar se precisa de nova página
        if (yPosition + (splitText.length * 7) > doc.internal.pageSize.height - 30) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Adicionar a seção
        doc.text(splitText, 20, yPosition);
        yPosition += splitText.length * 7 + 10;
      }
      
      // Adicionar rodapé na última página
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text("Gerado por @dgsolutionweb", 20, doc.internal.pageSize.height - 20);
      doc.text("Siga-nos para mais dicas de nutrição e bem-estar!", 20, doc.internal.pageSize.height - 15);
      
      // Salvar o PDF
      doc.save("plano-alimentar-personalizado.pdf");
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar o PDF. Por favor, tente novamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Cabeçalho */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Seu Plano Alimentar Personalizado
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Conteúdo com scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-gray-700 text-base">
              {plan}
            </pre>
          </div>
        </div>

        {/* Rodapé com botão de download */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              Baixe seu plano para ter acesso offline e poder compartilhar facilmente!
            </p>
            <button
              onClick={downloadPDF}
              disabled={isGeneratingPDF}
              className="flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
            >
              {isGeneratingPDF ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Gerando PDF...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Baixar PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 