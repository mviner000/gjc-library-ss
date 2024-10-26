import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

type RoleConfig = {
  name: string;
  displayPriority: number;
  defaultOpenPriority: number;
  color: string;
};

const roleConfigs: RoleConfig[] = [
  {
    name: "Project Manager",
    displayPriority: 1,
    defaultOpenPriority: 1,
    color: "text-blue-800",
  },
  {
    name: "Developer",
    displayPriority: 2,
    defaultOpenPriority: 2,
    color: "text-emerald-800",
  },
  {
    name: "UI Designer",
    displayPriority: 3,
    defaultOpenPriority: 3,
    color: "text-purple-800",
  },
  {
    name: "Graphic Designer",
    displayPriority: 4,
    defaultOpenPriority: 4,
    color: "text-pink-800",
  },
  {
    name: "Content Creator",
    displayPriority: 5,
    defaultOpenPriority: 5,
    color: "text-yellow-800",
  },
  {
    name: "Audio Producer",
    displayPriority: 6,
    defaultOpenPriority: 6,
    color: "text-red-800",
  },
  {
    name: "Quality Assurance Specialist",
    displayPriority: 7,
    defaultOpenPriority: 7,
    color: "text-cyan-800",
  },
];

const teamMembers: TeamMember[] = [
  {
    name: "Jonn Esternon",
    role: "Project Manager",
    image: "/team/esternon.jpg",
  },
  {
    name: "Rainier Maglaque",
    role: "Content Creator",
    image: "/team/maglaque.jpg",
  },
  {
    name: "Maverick Rosales",
    role: "Graphic Designer",
    image: "/team/rosales.jpg",
  },
  {
    name: "Mack Rafanan",
    role: "Graphic Designer",
    image: "/team/rafanan.jpg",
  },
  { name: "Maverick Rosales", role: "Developer", image: "/team/rosales.jpg" },
  { name: "Melvin Nogoy", role: "Developer", image: "/team/nogoy.jpg" },
  {
    name: "Jonn Esternon",
    role: "Audio Producer",
    image: "/team/esternon.jpg",
  },
  {
    name: "Jonn Esternon",
    role: "UI Designer",
    image: "/team/esternon.jpg",
  },
  {
    name: "Maverick Rosales",
    role: "UI Designer",
    image: "/team/rosales.jpg",
  },
  {
    name: "Emmanuel Sulit",
    role: "Quality Assurance Specialist",
    image: "/team/sulit.jpg",
  },
  {
    name: "Stephanie Cruz",
    role: "Quality Assurance Specialist",
    image: "/team/cruz.jpg",
  },
];

const TeamList = () => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const formatMemberNames = (members: TeamMember[]) => {
    return members.map((member, index, array) => (
      <React.Fragment key={`${member.name}-${member.role}-${index}`}>
        {member.name}
        {index < array.length - 1 && (
          <>
            {index === array.length - 2 ? (
              <span className="italic font-thin text-sm mx-2"> and </span>
            ) : (
              ", "
            )}
          </>
        )}
      </React.Fragment>
    ));
  };

  // Group members by role
  const groupedMembers = teamMembers.reduce((acc, member) => {
    const role = member.role;
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  // Get role config for a role name
  const getRoleConfig = (roleName: string): RoleConfig => {
    const config = roleConfigs.find((rc) => rc.name === roleName);
    return (
      config || {
        name: roleName,
        displayPriority: roleConfigs.length + 1,
        defaultOpenPriority: roleConfigs.length + 1,
        color: "text-gray-600",
      }
    );
  };

  // Sort roles by display priority
  const sortedRoles = Object.keys(groupedMembers).sort(
    (a, b) =>
      getRoleConfig(a).displayPriority - getRoleConfig(b).displayPriority
  );

  const defaultOpenValue = sortedRoles.reduce((defaultRole, currentRole) => {
    const defaultConfig = getRoleConfig(defaultRole);
    const currentConfig = getRoleConfig(currentRole);
    return currentConfig.defaultOpenPriority < defaultConfig.defaultOpenPriority
      ? currentRole
      : defaultRole;
  }, sortedRoles[0]);

  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <Card className="flex flex-col items-center p-6 space-y-4 transition-all hover:shadow-lg">
      <Avatar className="h-24 w-24">
        <AvatarImage src={member.image} alt={member.name} />
        <AvatarFallback className="bg-primary/10 text-xl">
          {getInitials(member.name)}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-2 text-center">
        <h3 className="font-semibold text-xl">{member.name}</h3>
        <Badge
          variant="secondary"
          className={`px-3 py-1 ${getRoleConfig(member.role).color}`}
        >
          {member.role}
        </Badge>
      </div>
    </Card>
  );

  return (
    <Card className="w-full max-w-6xl mt-10 mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Our Team
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Accordion type="single" defaultValue={defaultOpenValue} collapsible>
          {sortedRoles.map((role) => {
            const roleConfig = getRoleConfig(role);
            const members = groupedMembers[role];
            return (
              <AccordionItem key={role} value={role}>
                <AccordionTrigger className="text-xl">
                  <div className="flex flex-col items-start w-full relative">
                    <div className="flex items-center gap-2">
                      <div className="relative inline-flex items-center">
                        <span className={`font-semibold ${roleConfig.color}`}>
                          {role}
                        </span>
                        <Badge
                          variant="team"
                          className={`absolute -top-1 -right-7 ${roleConfig.color} text-white`}
                        >
                          {members.length}
                        </Badge>
                      </div>
                      <span className="text-muted-foreground ml-7 mt-1 font-bold text-lg">
                        {formatMemberNames(members)}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4">
                    {members.map((member) => (
                      <TeamMemberCard
                        key={`${member.name}-${member.role}`}
                        member={member}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default TeamList;
