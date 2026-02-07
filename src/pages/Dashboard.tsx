import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Globe, Edit, Trash2, Sparkles, CreditCard, LogOut, ExternalLink, Copy, Check } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/landing/Navbar';
import { useToast } from '@/hooks/use-toast';

interface Website {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

function WebsiteCard({ website, onDelete, toast }: { 
  website: Website; 
  onDelete: (id: string) => void;
  toast: (opts: { title: string; description?: string }) => void;
}) {
  const [copied, setCopied] = useState(false);
  const publicUrl = `${window.location.origin}/site/${website.slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    toast({ title: 'Link copied!', description: publicUrl });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-elevated p-6 min-h-[200px] flex flex-col">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 bg-primary/10 flex items-center justify-center" style={{ borderRadius: '6px' }}>
            <Globe className="w-5 h-5 text-primary" />
          </div>
        </div>
        <h3 className="font-semibold text-foreground mb-1">{website.name}</h3>
        <p className="text-sm text-muted-foreground truncate">/site/{website.slug}</p>
      </div>
      <div className="flex gap-2 mt-4 pt-4 border-t">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => window.open(`/site/${website.slug}`, '_blank')}>
          <ExternalLink className="w-3 h-3 mr-1" /> View
        </Button>
        <Button variant="ghost" size="sm" onClick={copyLink}>
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(website.id)} className="text-destructive">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loadingWebsites, setLoadingWebsites] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchWebsites();
    }
  }, [user]);

  const fetchWebsites = async () => {
    if (!user) {
      return;
    }
    
    const { data, error } = await supabase
      .from('websites')
      .select('id, name, slug, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setWebsites(data);
    }
    setLoadingWebsites(false);
  };

  const deleteWebsite = async (id: string) => {
    const { error } = await supabase.from('websites').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Website deleted' });
      fetchWebsites();
      refreshProfile();
    }
  };

  let can_create = false;
  if (profile?.is_pro) {
    can_create = true;
  } else if ((profile?.credits ?? 0) > 0 && websites.length < 1) {
    can_create = true;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent" style={{ borderRadius: '50%' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome{profile?.full_name ? `, ${profile.full_name}` : ''}!
            </h1>
            <p className="text-muted-foreground">Manage your websites</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted" style={{ borderRadius: '6px' }}>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{profile?.credits ?? 0} credits</span>
            </div>
            {profile?.is_pro && <span className="badge-pro"><Sparkles className="w-3 h-3 mr-1" />PRO</span>}
            <Button variant="ghost" onClick={signOut} className="btn-ghost">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => can_create ? navigate('/templates') : navigate('/pricing')}
            className="card-elevated p-6 border-2 border-dashed border-border hover:border-primary/50 cursor-pointer flex flex-col items-center justify-center min-h-[200px] text-center group"
          >
            <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors" style={{ borderRadius: '8px' }}>
              <Plus className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">Create Website</h3>
            <p className="text-sm text-muted-foreground">
              {can_create ? 'Choose a template' : 'Upgrade to Pro'}
            </p>
          </div>

          {websites.map((website) => (
            <WebsiteCard 
              key={website.id} 
              website={website} 
              onDelete={deleteWebsite}
              toast={toast}
            />
          ))}

          {websites.length === 0 && !loadingWebsites && (
            <div className="card-elevated p-6 min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No websites yet</p>
              </div>
            </div>
          )}
        </motion.div>

        {!profile?.is_pro && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 p-6 gradient-hero text-primary-foreground" style={{ borderRadius: '12px' }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold mb-1">Upgrade to Pro</h3>
                <p className="opacity-90">Remove watermarks, visual editor & unlimited websites</p>
              </div>
              <Button onClick={() => navigate('/pricing')} variant="secondary" className="bg-white text-foreground hover:bg-white/90">
                View Plans
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
