import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, Users, Music, Calendar } from "lucide-react";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            BackLine
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Bienvenue sur BackLine !</h2>
          <p className="text-muted-foreground">
            Créez votre profil, trouvez des musiciens et gérez vos groupes.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-primary" />
              <CardTitle className="text-lg">Mon Profil</CardTitle>
              <CardDescription>
                Créer ou modifier votre profil de musicien
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <CardTitle className="text-lg">Trouver des Musiciens</CardTitle>
              <CardDescription>
                Découvrir des profils compatibles
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Music className="h-8 w-8 mx-auto mb-2 text-primary" />
              <CardTitle className="text-lg">Mes Groupes</CardTitle>
              <CardDescription>
                Gérer vos groupes et projets
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <CardTitle className="text-lg">Répétitions</CardTitle>
              <CardDescription>
                Planifier et organiser vos sessions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Pour commencer</CardTitle>
            <CardDescription>
              Suivez ces étapes pour tirer le meilleur parti de BackLine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Créez votre profil</h4>
                  <p className="text-muted-foreground text-sm">
                    Ajoutez vos instruments, styles musicaux et informations personnelles
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Explorez la communauté</h4>
                  <p className="text-muted-foreground text-sm">
                    Découvrez d'autres musiciens et groupes près de chez vous
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Connectez-vous</h4>
                  <p className="text-muted-foreground text-sm">
                    Envoyez des messages et créez vos premiers groupes
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}