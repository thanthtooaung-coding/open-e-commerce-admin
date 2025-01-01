import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { User, Mail, Phone, Home, CreditCard, Briefcase, Calendar, MapPin, Edit2, Save } from 'lucide-react'

interface OwnerDetailsDialogProps {
  owner: {
    name: string
    username: string
    email: string
    phone: string
    address: string
    nrc: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OwnerDetailsDialog({ owner, open, onOpenChange }: OwnerDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedOwner, setEditedOwner] = useState(owner)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically update the owner data in your backend
    console.log("Saving edited owner data:", editedOwner)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedOwner(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Owner Details</DialogTitle>
          <DialogDescription>Comprehensive information about the store owner.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-center">
            <Avatar className="h-32 w-32">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${editedOwner.name}`} alt={editedOwner.name} />
              <AvatarFallback>{editedOwner.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{editedOwner.name}</h2>
            <p className="text-muted-foreground">@{editedOwner.username}</p>
          </div>
          <div className="flex justify-center space-x-2">
            <Badge variant="secondary">Store Owner</Badge>
            <Badge variant="outline">Active</Badge>
          </div>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>View and edit owner's personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          value={editedOwner.name}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          value={editedOwner.email}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          value={editedOwner.phone}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nrc">NRC</Label>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="nrc"
                          name="nrc"
                          value={editedOwner.nrc}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex items-center space-x-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        name="address"
                        value={editedOwner.address}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {isEditing ? (
                    <Button onClick={handleSave} className="w-full">
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                  ) : (
                    <Button onClick={handleEdit} className="w-full">
                      <Edit2 className="mr-2 h-4 w-4" /> Edit Information
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Overview of the owner's recent actions and events.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Added a new product</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Updated store hours</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </li>
                    <li className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Changed store location</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

