import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  User, Bell, CreditCard, Shield, Sparkles, Upload, Save, Instagram,
  Twitter, Facebook, Youtube, Globe
} from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";

export default function Settings() {
  const { user, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    username: user?.name || "",
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    age: "",
    nickname: "",
    church: "",
    doctrine: "",
    interests: user?.interests || "",
    instagramHandle: "",
    twitterHandle: "",
    facebookHandle: "",
    youtubeHandle: "",
  });

  // Notification preferences
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailNotifications: true,
    pushNotifications: true,
    cellGroupUpdates: true,
    reelLikes: true,
    newFollowers: true,
    weeklyDigest: true,
    productUpdates: false,
  });

  // Creator mode
  const [isCreatorMode, setIsCreatorMode] = useState(user?.isCreator || false);

  const updateMutation = trpc.profile.update.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
      toast.success("Settings updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update settings");
    },
  });

  const handleSaveProfile = () => {
    updateMutation.mutate({
      name: profileForm.name,
      bio: profileForm.bio,
      interests: profileForm.interests,
      isCreator: isCreatorMode,
    });
  };

  const handleSaveNotifications = () => {
    // In a real implementation, this would save to the backend
    toast.success("Notification preferences updated!");
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to access settings</h1>
          <Button>Sign In</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-20">
        <div className="container pt-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5">
                <TabsTrigger value="profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="billing">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing
                </TabsTrigger>
                <TabsTrigger value="creator">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Creator
                </TabsTrigger>
                <TabsTrigger value="privacy" className="hidden lg:flex">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy
                </TabsTrigger>
              </TabsList>

              {/* Profile Settings */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>Upload your profile photo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={user?.avatarUrl || undefined} />
                        <AvatarFallback className="text-2xl">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Button size="sm" variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Photo
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          JPG, PNG or GIF. Max size 5MB.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username *</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">@</span>
                          <Input
                            id="username"
                            value={profileForm.username}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, username: e.target.value })
                            }
                            className="pl-7"
                            placeholder="yourname"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Used for mentions and community participation
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input
                          id="name"
                          value={profileForm.name}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, name: e.target.value })
                          }
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nickname">Nickname</Label>
                        <Input
                          id="nickname"
                          value={profileForm.nickname}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, nickname: e.target.value })
                          }
                          placeholder="Optional"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={profileForm.age}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, age: e.target.value })
                          }
                          placeholder="Optional"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="church">Church</Label>
                        <Input
                          id="church"
                          value={profileForm.church}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, church: e.target.value })
                          }
                          placeholder="Your church name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="doctrine">Christian Doctrine</Label>
                        <Select value={profileForm.doctrine} onValueChange={(value) => setProfileForm({ ...profileForm, doctrine: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select doctrine" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="catholic">Catholic</SelectItem>
                            <SelectItem value="protestant">Protestant</SelectItem>
                            <SelectItem value="orthodox">Orthodox</SelectItem>
                            <SelectItem value="anglican">Anglican</SelectItem>
                            <SelectItem value="baptist">Baptist</SelectItem>
                            <SelectItem value="pentecostal">Pentecostal</SelectItem>
                            <SelectItem value="methodist">Methodist</SelectItem>
                            <SelectItem value="lutheran">Lutheran</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileForm.bio}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, bio: e.target.value })
                        }
                        placeholder="Tell us about yourself..."
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">
                        {profileForm.bio.length}/500 characters
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interests">Interests</Label>
                      <Input
                        id="interests"
                        value={profileForm.interests}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, interests: e.target.value })
                        }
                        placeholder="Prayer, Bible Study, Worship (comma-separated)"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Media</CardTitle>
                    <CardDescription>Connect your social media accounts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <div className="flex gap-2">
                        <Instagram className="w-5 h-5 text-muted-foreground mt-2" />
                        <Input
                          id="instagram"
                          value={profileForm.instagramHandle}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, instagramHandle: e.target.value })
                          }
                          placeholder="@username"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter / X</Label>
                      <div className="flex gap-2">
                        <Twitter className="w-5 h-5 text-muted-foreground mt-2" />
                        <Input
                          id="twitter"
                          value={profileForm.twitterHandle}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, twitterHandle: e.target.value })
                          }
                          placeholder="@username"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <div className="flex gap-2">
                        <Facebook className="w-5 h-5 text-muted-foreground mt-2" />
                        <Input
                          id="facebook"
                          value={profileForm.facebookHandle}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, facebookHandle: e.target.value })
                          }
                          placeholder="Profile URL"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="youtube">YouTube</Label>
                      <div className="flex gap-2">
                        <Youtube className="w-5 h-5 text-muted-foreground mt-2" />
                        <Input
                          id="youtube"
                          value={profileForm.youtubeHandle}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, youtubeHandle: e.target.value })
                          }
                          placeholder="Channel URL"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={updateMutation.isPending}>
                    <Save className="w-4 h-4 mr-2" />
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose how you want to be notified about updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via email
                          </p>
                        </div>
                        <Switch
                          checked={notificationPrefs.emailNotifications}
                          onCheckedChange={(checked) =>
                            setNotificationPrefs({ ...notificationPrefs, emailNotifications: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications on your device
                          </p>
                        </div>
                        <Switch
                          checked={notificationPrefs.pushNotifications}
                          onCheckedChange={(checked) =>
                            setNotificationPrefs({ ...notificationPrefs, pushNotifications: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Cell Group Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about new meetings and updates
                          </p>
                        </div>
                        <Switch
                          checked={notificationPrefs.cellGroupUpdates}
                          onCheckedChange={(checked) =>
                            setNotificationPrefs({ ...notificationPrefs, cellGroupUpdates: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Reel Likes & Comments</Label>
                          <p className="text-sm text-muted-foreground">
                            When someone likes or comments on your reels
                          </p>
                        </div>
                        <Switch
                          checked={notificationPrefs.reelLikes}
                          onCheckedChange={(checked) =>
                            setNotificationPrefs({ ...notificationPrefs, reelLikes: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Followers</Label>
                          <p className="text-sm text-muted-foreground">
                            When someone follows you
                          </p>
                        </div>
                        <Switch
                          checked={notificationPrefs.newFollowers}
                          onCheckedChange={(checked) =>
                            setNotificationPrefs({ ...notificationPrefs, newFollowers: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Weekly Digest</Label>
                          <p className="text-sm text-muted-foreground">
                            Summary of your week's activity
                          </p>
                        </div>
                        <Switch
                          checked={notificationPrefs.weeklyDigest}
                          onCheckedChange={(checked) =>
                            setNotificationPrefs({ ...notificationPrefs, weeklyDigest: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Product Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            News about new features and updates
                          </p>
                        </div>
                        <Switch
                          checked={notificationPrefs.productUpdates}
                          onCheckedChange={(checked) =>
                            setNotificationPrefs({ ...notificationPrefs, productUpdates: checked })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </TabsContent>

              {/* Billing Settings */}
              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Plan</CardTitle>
                    <CardDescription>Manage your mannuh pledge</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <p className="font-semibold">Freemium</p>
                          <p className="text-sm text-muted-foreground">$0/month</p>
                        </div>
                        <Badge variant="secondary">Current Plan</Badge>
                      </div>
                      <Button asChild className="w-full">
                        <a href="/pricing">Upgrade to Premium</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Credits Balance</CardTitle>
                    <CardDescription>
                      Use credits for premium features and content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <p className="text-4xl font-bold mb-2">0</p>
                      <p className="text-sm text-muted-foreground mb-4">Available Credits</p>
                      <Button variant="outline">Earn More Credits</Button>
                    </div>
                    <div className="mt-6 text-sm text-muted-foreground">
                      <p className="font-semibold mb-2">How to earn credits:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Complete your profile (+10 credits)</li>
                        <li>Join a cell group (+5 credits)</li>
                        <li>Post your first reel (+20 credits)</li>
                        <li>Invite friends (+15 credits per friend)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Creator Settings */}
              <TabsContent value="creator" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Creator Mode</CardTitle>
                    <CardDescription>
                      Enable creator privileges to post content and earn revenue
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <Label className="text-base">Creator Mode</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Available to Premium members only
                        </p>
                      </div>
                      <Switch checked={isCreatorMode} disabled />
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Creator Benefits:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Post reels, articles, and stories</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Earn ad revenue based on views and engagement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Access creator analytics dashboard</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Priority support and resources</span>
                        </li>
                      </ul>
                    </div>

                    <Button asChild className="w-full">
                      <a href="/pricing">Upgrade to Premium</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Creator Partner Program</CardTitle>
                    <CardDescription>
                      Learn more about monetizing your content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Join our Creator Partner Program and start earning from your faith-based content.
                      Share your story, inspire others, and get compensated for your creativity.
                    </p>
                    <Button variant="outline" asChild className="w-full">
                      <a href="/partner">Learn More</a>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Settings */}
              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                    <CardDescription>Control your privacy settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          Make your profile visible to everyone
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Activity Status</Label>
                        <p className="text-sm text-muted-foreground">
                          Show when you're online
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Let others send you direct messages
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data & Account</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Download Your Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-destructive">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
