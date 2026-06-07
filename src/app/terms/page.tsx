"use client";

import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";

export default function Terms() {
  return (
    <main className="min-h-screen text-white">
      <SiteNavbar />
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-4xl font-bold mb-2">Termini e Condizioni</h1>
        <p className="text-gray-500 text-sm mb-12">Ultimo aggiornamento: Aprile 2026</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Accettazione dei termini</h2>
            <p>Utilizzando SolMint accetti integralmente questi termini. Se non li accetti, non utilizzare il servizio. SolMint è uno strumento tecnico per la creazione di token SPL su Solana.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Natura del servizio</h2>
            <p>SolMint è uno strumento tecnico non-custodial. Non siamo un exchange, non gestiamo fondi e non offriamo consulenza finanziaria. Le fee pagate sono per il servizio tecnico di creazione token e non costituiscono investimento.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Responsabilità dell&apos;utente</h2>
            <p>Sei il solo responsabile dei token che crei tramite SolMint. È vietato creare token con finalità fraudolente, di truffa, pump and dump, o che violino leggi locali. SolMint non è responsabile per l&apos;uso che gli utenti fanno dei token creati.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Fee e transazioni</h2>
            <p>Le fee addebitate sono chiaramente indicate prima di ogni transazione. Tutte le transazioni blockchain sono irreversibili. SolMint non può rimborsare fee già pagate on-chain. Verifica sempre i dettagli prima di firmare con il tuo wallet.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Rischi blockchain</h2>
            <p>Le transazioni su blockchain comportano rischi intrinseci inclusi ma non limitati a: volatilità del prezzo di SOL, congestione della rete, bug nei contratti. Usa SolMint consapevolmente e solo con fondi che puoi permetterti di perdere.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Limitazione di responsabilità</h2>
            <p>SolMint è fornito &quot;as is&quot; senza garanzie di alcun tipo. Non siamo responsabili per perdite dirette o indirette derivanti dall&apos;uso del servizio, malfunzionamenti della blockchain Solana o di servizi terzi.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Modifiche</h2>
            <p>Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno effettive dalla data di pubblicazione sul sito.</p>
          </section>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
