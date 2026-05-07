import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { QrCode, MapPin, Calendar, Clock, Users } from 'lucide-react';

export interface TicketData {
  ticketId: string;
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  stadium: string;
  city: string;
  date: string;
  time: string;
  sector: string;
  quantity: number;
  buyerName: string;
  buyerEmail: string;
  purchaseDate: Date;
}

interface TicketPDFProps {
  ticket: TicketData;
  innerRef?: (el: HTMLDivElement | null) => void;
}

export const TicketPDF: React.FC<TicketPDFProps> = ({ ticket, innerRef }) => {
  const formattedDate = format(new Date(ticket.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  const purchaseDateFormatted = format(ticket.purchaseDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });

  return (
    <div ref={innerRef} className="bg-white text-black p-8 w-[800px]" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="flex justify-between items-center border-b-4 border-[#8B0000] pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#8B0000]">FIFA World Cup 2026™</h1>
          <p className="text-gray-600">Official Match Ticket</p>
        </div>
        <div className="text-right text-4xl">⚽</div>
      </div>

      {/* Match Info */}
      <div className="bg-gradient-to-r from-[#8B0000] to-[#B22222] text-white p-6 rounded-lg mb-6">
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <img 
              src={ticket.homeFlag} 
              alt={ticket.homeTeam} 
              className="w-16 h-12 object-cover rounded shadow-md mx-auto"
              crossOrigin="anonymous"
            />
            <p className="text-xl font-bold mt-2">{ticket.homeTeam}</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-light">VS</span>
          </div>
          <div className="text-center">
            <img 
              src={ticket.awayFlag} 
              alt={ticket.awayTeam} 
              className="w-16 h-12 object-cover rounded shadow-md mx-auto"
              crossOrigin="anonymous"
            />
            <p className="text-xl font-bold mt-2">{ticket.awayTeam}</p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#8B0000]" />
            <div>
              <p className="text-sm text-gray-500">Estádio</p>
              <p className="font-semibold">{ticket.stadium}</p>
              <p className="text-sm text-gray-600">{ticket.city}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#8B0000]" />
            <div>
              <p className="text-sm text-gray-500">Data</p>
              <p className="font-semibold">{formattedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#8B0000]" />
            <div>
              <p className="text-sm text-gray-500">Horário</p>
              <p className="font-semibold">{ticket.time}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#8B0000]" />
            <div>
              <p className="text-sm text-gray-500">Setor / Quantidade</p>
              <p className="font-semibold">{ticket.sector}</p>
              <p className="text-sm text-gray-600">{ticket.quantity} ingresso(s)</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Titular</p>
            <p className="font-semibold">{ticket.buyerName}</p>
            <p className="text-sm text-gray-600">{ticket.buyerEmail}</p>
          </div>
        </div>
      </div>

      {/* QR Code and Ticket ID */}
      <div className="flex justify-between items-end border-t-2 border-dashed border-gray-300 pt-6">
        <div>
          <p className="text-sm text-gray-500">Código do Ingresso</p>
          <p className="font-mono text-lg font-bold">{ticket.ticketId}</p>
          <p className="text-xs text-gray-400 mt-1">Comprado em: {purchaseDateFormatted}</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
            <QrCode className="w-16 h-16 text-gray-700" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Escaneie na entrada</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>Este ingresso é pessoal e intransferível. Apresente um documento de identificação na entrada.</p>
        <p className="mt-1">© 2026 FIFA World Cup™ - Todos os direitos reservados</p>
      </div>
    </div>
  );
};
